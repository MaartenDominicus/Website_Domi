param([switch]$DryRun)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$stateDirectory = Join-Path $projectRoot 'work\website-scheduler'
$statePath = Join-Path $stateDirectory 'budget.json'
$promptPath = Join-Path $PSScriptRoot 'website-improvement-loop.prompt.md'
$dailyLimitSeconds = 28800
$mutex = New-Object System.Threading.Mutex($false, 'Local\DomiWebsiteImprovementLoop')
if (-not $mutex.WaitOne(0)) { Write-Output 'Website improvement loop is already running.'; exit 0 }
function Save-BudgetState {
    param($State)
    $tempPath = Join-Path $stateDirectory 'budget.json.tmp'
    $State | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath $tempPath -Encoding UTF8
    Move-Item -LiteralPath $tempPath -Destination $statePath -Force
}
try {
    New-Item -ItemType Directory -Force -Path $stateDirectory | Out-Null
    $today = (Get-Date).ToString('yyyy-MM-dd')
    $state = [ordered]@{ date = $today; usedSeconds = 0.0; activeSince = $null }
    if (Test-Path -LiteralPath $statePath) {
        $saved = Get-Content -LiteralPath $statePath -Raw | ConvertFrom-Json
        if ($saved.date -eq $today) {
            $state.usedSeconds = [double]$saved.usedSeconds
            if ($saved.activeSince) {
                $staleStart = [datetime]::Parse($saved.activeSince)
                $state.usedSeconds += [Math]::Max(0, ((Get-Date) - $staleStart).TotalSeconds)
            }
        }
    }
    Save-BudgetState $state
    # Scheduled Task runs with a smaller PATH than an interactive Codex shell.
    $toolPaths = @(
        (Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd'),
        (Join-Path $env:ProgramFiles 'nodejs')
    )
    $codexBin = Join-Path $env:LOCALAPPDATA 'OpenAI\Codex\bin'
    $rgExe = Get-ChildItem -LiteralPath $codexBin -Filter rg.exe -Recurse -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty FullName
    if ($rgExe) { $toolPaths += Split-Path $rgExe -Parent }
    $existingToolPaths = $toolPaths | Where-Object { Test-Path -LiteralPath $_ }
    $env:PATH = (($existingToolPaths + @($env:PATH)) -join ';')
    if (-not (Get-Command git.exe -ErrorAction SilentlyContinue) -or -not (Get-Command node.exe -ErrorAction SilentlyContinue)) {
        throw 'Git or Node was not found in the scheduled task environment.'
    }
    $codexCommand = Get-Command codex.exe -ErrorAction SilentlyContinue
    if ($codexCommand) { $codexExe = $codexCommand.Source }
    else {
        $binRoot = Join-Path $env:LOCALAPPDATA 'OpenAI\Codex\bin'
        $codexExe = Get-ChildItem -LiteralPath $binRoot -Filter codex.exe -Recurse -File | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty FullName
    }
    if (-not $codexExe -or -not (Test-Path -LiteralPath $codexExe)) { throw 'Codex CLI was not found.' }
    do {
        $now = Get-Date
        $remainingToday = ($now.Date.AddDays(1) - $now).TotalSeconds
        $remainingBudget = $dailyLimitSeconds - [double]$state.usedSeconds
        $availableSeconds = [Math]::Floor([Math]::Min($remainingToday, $remainingBudget))
        if ($availableSeconds -lt 120) { break }
        if ($DryRun) {
            Write-Output ("Ready: model=gpt-6.1-sol, project={0}, remaining today={1:N0}s" -f $projectRoot, $availableSeconds)
            break
        }
        $runId = $now.ToString('yyyyMMdd-HHmmss')
        $stdoutPath = Join-Path $stateDirectory ($runId + '.stdout.log')
        $stderrPath = Join-Path $stateDirectory ($runId + '.stderr.log')
        $summaryPath = Join-Path $stateDirectory ($runId + '.summary.txt')
        $quote = [char]34
        $arguments = @('exec', '--model', 'gpt-6.1-sol', '--approve-for-me', '--ephemeral', '--output-last-message', ($quote + $summaryPath + $quote), '-')
        $state.activeSince = $now.ToString('o')
        Save-BudgetState $state
        $process = $null
        $timedOut = $false
        try {
            $process = Start-Process -FilePath $codexExe -ArgumentList $arguments -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru -RedirectStandardInput $promptPath -RedirectStandardOutput $stdoutPath -RedirectStandardError $stderrPath
            $finished = $process.WaitForExit([int]($availableSeconds * 1000))
            if (-not $finished) {
                $timedOut = $true
                $taskkill = Join-Path $env:WINDIR 'System32\taskkill.exe'
                & $taskkill /PID $process.Id /T /F | Out-Null
                $process.WaitForExit()
            }
        } finally {
            $ended = Get-Date
            $state.usedSeconds = [Math]::Min($dailyLimitSeconds, [double]$state.usedSeconds + [Math]::Max(0, ($ended - $now).TotalSeconds))
            $state.activeSince = $null
            Save-BudgetState $state
        }
        $process.Refresh()
        $summary = if (Test-Path -LiteralPath $summaryPath) { Get-Content -LiteralPath $summaryPath -Raw } else { 'RESULT: BLOCKED' + [Environment]::NewLine + 'No final summary was produced.' }
        $report = @("Run: $runId", "Ended: $($ended.ToString('o'))", "Duration seconds: $([Math]::Round(($ended - $now).TotalSeconds))", "Daily seconds used: $([Math]::Round([double]$state.usedSeconds))", "Exit code: $($process.ExitCode)", "Timed out: $timedOut", '', $summary) -join [Environment]::NewLine
        Set-Content -LiteralPath (Join-Path $stateDirectory 'latest-report.txt') -Value $report -Encoding UTF8
        if ($timedOut -or ($null -ne $process.ExitCode -and $process.ExitCode -ne 0) -or $summary -match '(?m)^RESULT:\s*(NO_ACTION|BLOCKED)') { break }
    } while ($true)
} finally {
    $mutex.ReleaseMutex()
    $mutex.Dispose()
}
