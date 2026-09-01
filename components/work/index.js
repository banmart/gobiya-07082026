import CaseOutcome from './CaseOutcome';
import CaseFunnel from './CaseFunnel';
import CaseBuildLog from './CaseBuildLog';
import CaseProductTour from './CaseProductTour';
import CaseMarketplace from './CaseMarketplace';
import CaseCitation from './CaseCitation';
import CaseSystem from './CaseSystem';
import CaseDispatch from './CaseDispatch';
import CaseDocFlow from './CaseDocFlow';

/**
 * Case study slug → layout. One each, no shared shell.
 *
 * Replaces components/CaseStudyTemplate.js. Each layout is built around what
 * the project actually was — an outcome, a funnel, a build log, a system
 * diagram — rather than around a fixed sequence of case-study sections.
 */
const CASE_LAYOUTS = {
  'smile-center-dentistry': CaseOutcome,
  'american-livescan': CaseFunnel,
  'safetycentric': CaseBuildLog,
  'quickpass-aid': CaseProductTour,
  'remodel-me-pros': CaseMarketplace,
  'the-healing-metta': CaseCitation,
  'total-capital': CaseSystem,
  'dg-plumbing': CaseDispatch,
  'mtw': CaseDocFlow,
};

export function layoutForCase(slug) {
  return CASE_LAYOUTS[slug] || null;
}

export { CASE_LAYOUTS };
