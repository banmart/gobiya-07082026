import { notFound } from 'next/navigation';
import { layoutForCase } from '../../../components/work';
import { CASE_STUDIES, getCaseStudy } from '../../../lib/work';
import { buildMetadata } from '../../../lib/meta';

export function generateStaticParams() {
  return CASE_STUDIES.filter((c) => c.study).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.client,
    description: cs.study.metaDescription,
    path: `/work/${cs.slug}`,
    parent: 'Work',
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  // As with services and solutions: a missing layout fails the build rather
  // than silently falling back to a shared one.
  const Layout = layoutForCase(slug);
  if (!Layout) {
    throw new Error(
      `No layout registered for case study "${slug}". Add one in components/work/index.js.`
    );
  }

  return <Layout cs={cs} />;
}
