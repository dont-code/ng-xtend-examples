import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Button} from '@openng/optimus-ui/button';
import {Card} from '@openng/optimus-ui/card';
import {AbstractDcWorkflow} from 'dc-workflow';
import {XtRenderComponent} from 'xt-components';
import {Book} from './book';

/**
 * A custom workflow component.
 *
 * It extends AbstractDcWorkflow<Book> instead of AbstractDcWorkflowBase because
 * it needs storage. The base class gives us:
 *   - the required `config` input (provided by <wfw-render>),
 *   - `entityName`, `search`, `searchedElements` and `updating`,
 *   - lazy access to an XtSignalStore via `safeFindStore()` / `fetchFromStore()`.
 *
 * Nothing here is loaded remotely: the component is imported and registered
 * statically by the application.
 */
@Component({
  selector: 'wfw-book-cards',
  imports: [XtRenderComponent, Card, Button],
  templateUrl: './book-cards-workflow.html',
  styleUrl: './book-cards-workflow.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardsWorkflow extends AbstractDcWorkflow<Book> implements OnInit {

  override ngOnInit(): void {
    super.ngOnInit();
    this.fetchFromStore();
  }

  protected reload(): void {
    this.fetchFromStore();
  }

  protected addSample(): void {
    this.updating.set(true);
    this.safeFindStore().storeEntity({
      bookName: `Sample Book ${new Date().toISOString()}`,
      author: 'ng-xtend',
      read: false
    }).catch((error) => {
      this.errorHandler.errorOccurred(error, 'Error saving sample book');
    }).finally(() => {
      this.updating.set(false);
    });
  }

  protected deleteBook(book: Book): void {
    if (book._id == null) {
      return;
    }
    this.updating.set(true);
    this.safeFindStore().deleteEntity(book._id).catch((error) => {
      this.errorHandler.errorOccurred(error, 'Error deleting book');
    }).finally(() => {
      this.updating.set(false);
    });
  }
}
