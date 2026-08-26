export default function OriginalArticleBody({ html }: { html: string }) {
  return <div className="original-article" dangerouslySetInnerHTML={{ __html: html }} />;
}
