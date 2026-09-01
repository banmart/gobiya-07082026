import SolTriage from './SolTriage';
import SolVisibilityCheck from './SolVisibilityCheck';
import SolStopwatch from './SolStopwatch';

/**
 * Solution slug → layout. One each, no shared shell.
 *
 * Replaces the inline markup in app/solutions/[slug]/page.js, which rendered
 * all three through the same sequence of inline-styled divs.
 */
const SOLUTION_LAYOUTS = {
  'traffic-dropped-rankings-flat': SolTriage,
  'not-showing-up-in-chatgpt': SolVisibilityCheck,
  'site-is-slow-losing-leads': SolStopwatch,
};

export function layoutForSolution(slug) {
  return SOLUTION_LAYOUTS[slug] || null;
}

export { SOLUTION_LAYOUTS };
