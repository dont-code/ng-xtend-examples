import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {XtResolverService} from 'xt-components';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtApiStoreProvider, XtStoreManagerService} from 'xt-store';
import {registerBookCardsWorkflow} from '../custom-workflow/register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly resolverService = inject(XtResolverService);
  protected readonly storeMgr = inject(XtStoreManagerService);
  protected readonly apiProvider = inject(XtApiStoreProvider);

  protected title = 'Ng-Xtend Workflow Example';

  constructor() {
    // Default plugin renders the fields of each stored book.
    registerDefaultPlugin(this.resolverService);

    // The custom workflow is imported and registered statically.
    registerBookCardsWorkflow(this.resolverService);

    // Types let ng-xtend pick the right renderers for each field.
    this.resolverService.registerTypes({
      'Example Book': {
        bookName: 'string',
        author: 'string',
        read: 'boolean'
      }
    });

    // xt-store persists the workflow entities through the REST API provider.
    this.apiProvider.apiUrl = 'https://test.dont-code.net/demo/data';
    this.storeMgr.setDefaultStoreProvider(this.apiProvider);
  }
}
