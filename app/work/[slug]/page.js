import { notFound } from 'next/navigation';
import CaseStudyTemplate from '../../../components/CaseStudyTemplate';
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
    title: `${cs.client} Case Study — ${cs.result}`,
    description: cs.study.metaDescription,
    path: `/work/${cs.slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  return <CaseStudyTemplate cs={cs} />;
}
