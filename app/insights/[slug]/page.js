import { notFound } from 'next/navigation';
import ArticleTemplate from '../../../components/ArticleTemplate';
import { INSIGHTS, getInsight } from '../../../lib/insights';

export function generateStaticParams() {
  return INSIGHTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();
  return <ArticleTemplate article={article} />;
}
