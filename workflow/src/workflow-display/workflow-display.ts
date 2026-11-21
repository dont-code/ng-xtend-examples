import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DcWorkflowModel, WfwRender} from 'dc-workflow';
import {BOOK_CARDS_WORKFLOW} from '../custom-workflow/register';

@Component({
  selector: 'app-workflow-display',
  imports: [WfwRender],
  templateUrl: './workflow-display.html',
  styleUrl: './workflow-display.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowDisplay {
  /**
   * WfwRender resolves this config to the statically registered
   * BookCardsWorkflow component. The entity name is also the store collection.
   */
  protected readonly workflowConfig: DcWorkflowModel = {
    entity: 'Example Book',
    workflow: BOOK_CARDS_WORKFLOW,
    data: {
      sort: {
        bookName: 'ascending'
      }
    }
  };
}
