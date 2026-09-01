import { notFound } from 'next/navigation';
import { layoutForSolution } from '../../../components/solutions';
import { buildMetadata } from '../../../lib/meta';
import { getSolution, SOLUTION_SLUGS, solutionPath } from '../../../lib/solutions';

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sol = getSolution(slug);
  if (!sol) return {};
  return buildMetadata({
    title: sol.metaTitle,
    description: sol.metaDescription,
    path: solutionPath(slug),
    parent: 'Solutions',
  });
}

export default async function SolutionDetailPage({ params }) {
  const { slug } = await params;
  const sol = getSolution(slug);
  if (!sol) notFound();

  // As with services: a missing layout fails the build rather than falling
  // back to a shared one.
  const Layout = layoutForSolution(slug);
  if (!Layout) {
    throw new Error(
      `No layout registered for solution "${slug}". Add one in components/solutions/index.js.`
    );
  }

  return <Layout sol={sol} />;
}
