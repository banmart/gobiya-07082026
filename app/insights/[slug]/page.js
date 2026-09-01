import { notFound } from 'next/navigation';
import ArticleTemplate from '../../../components/ArticleTemplate';
import { INSIGHTS, getInsight } from '../../../lib/insights';
import { buildMetadata } from '../../../lib/meta';

export function generateStaticParams() {
  return INSIGHTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.metaDescription,
    path: `/insights/${article.slug}`,
    parent: 'Insights',
    ogType: 'article',
    publishedTime: article.date,
    // Falls back to the publish date only when the article has never been
    // revised. Aliasing the two outright claims nothing has ever been updated.
    modifiedTime: article.updated || article.date,
    authors: ['https://www.gobiya.com/about/steve-martin'],
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();
  return <ArticleTemplate article={article} />;
}
