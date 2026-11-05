// Progressive enhancement; existing React bundles and protected content stay intact.
(() => {
  function mount() {
    // The existing site's effect adds this class after React commits hydration.
    // Wait for that observable signal instead of mutating SSR DOM before hydration.
    if (!document.documentElement.classList.contains('animations-ready')) return false;
    if (document.documentElement.lang !== 'nl' || document.querySelector('[data-domi-tools-entry]')) return;
    const main = document.querySelector('main');
    const services = main?.querySelector('#diensten');
    if (!services) return;
    const section = document.createElement('section');
    section.className = 'domi-tools-entry';
    section.id = 'hulpmiddelen';
    section.dataset.domiToolsEntry = 'true';
    section.setAttribute('aria-labelledby', 'domi-tools-title');
    section.innerHTML = '<div><p class="tool-eyebrow">Voorbereiden met inzicht</p><h2 id="domi-tools-title">Een helder begin voor uw project.</h2><p>Breng uw wensen in kaart met een passende checklist. Of bereken alvast hoeveel tegels en verpakkingen bij uw oppervlakte passen.</p></div><div class="tool-actions"><a class="tool-button" href="/hulpmiddelen/projectvoorbereider/">Bereid uw project voor ↗</a><a href="/hulpmiddelen/tegelcalculator/">Open de tegelcalculator ↗</a><a href="/hulpmiddelen/">Bekijk alle hulpmiddelen →</a></div>';
    const next = services.nextElementSibling;
    (next?.classList.contains('section-cta') ? next : services).after(section);
    return true;
  }
  const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
  observer.observe(document.documentElement, {attributes:true,attributeFilter:['class']});
  if (mount()) observer.disconnect();
})();
