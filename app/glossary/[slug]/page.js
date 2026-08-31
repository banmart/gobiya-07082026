import { notFound } from 'next/navigation';
import GlossaryTermTemplate from '../../../components/GlossaryTermTemplate';
import { GLOSSARY, getGlossaryTerm } from '../../../lib/glossary';
import { buildMetadata } from '../../../lib/meta';

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getGlossaryTerm(slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.term,
    description: entry.shortDefinition,
    path: `/glossary/${entry.slug}`,
    parent: 'Glossary',
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const entry = getGlossaryTerm(slug);
  if (!entry) notFound();
  return <GlossaryTermTemplate entry={entry} />;
}
