import {XtResolverService} from 'xt-components';
import {BookCardsWorkflow} from './book-cards-workflow';

/** The workflow name used in DcWorkflowModel.workflow. */
export const BOOK_CARDS_WORKFLOW = 'book-cards';

/**
 * Static registration: the workflow class is imported at build time.
 * No remote entry, federation config or registerPluginModule() call is needed.
 */
export function registerBookCardsWorkflow(resolver: XtResolverService): boolean {
  resolver.registerPlugin({
    name: 'bookCardsWorkflowPlugin',
    workflows: [
      {
        name: 'wfwBookCards',
        class: BookCardsWorkflow,
        workflowsHandled: [BOOK_CARDS_WORKFLOW]
      }
    ]
  });
  return true;
}
