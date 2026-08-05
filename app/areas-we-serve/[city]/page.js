import { redirect } from 'next/navigation';

// All /areas-we-serve/[city] URLs redirect permanently to /areas-we-serve.
// The canonical coverage listing is the single index page; individual city
// sub-pages are retired. This redirect is belt-and-suspenders alongside the
// wildcard rule in next.config.mjs \u2014 whichever fires first the visitor lands
// on /areas-we-serve in one hop.
//
// generateStaticParams is intentionally omitted so Next.js never pre-renders
// these city pages as static HTML. The middleware/config redirect runs before
// any rendering occurs, so they are effectively hidden from both visitors and
// crawlers.
export default function AreaPage() {
  redirect('/areas-we-serve');
}
