import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';
import {XtApiStoreProvider, XtStoreManagerService} from 'xt-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly resolverService = inject(XtResolverService);

    // We inject the xt-store services
  protected readonly storeMgr = inject(XtStoreManagerService);
  protected readonly apiProvider = inject(XtApiStoreProvider);

  protected title = 'Ng-Xtend Dynamic Example';

  constructor() {
      // We initialize the default plugin. Ng-Xtend framework will use it to handle primitives or generic object
    registerDefaultPlugin(this.resolverService);

     // We declare the types handled by the framework
    this.resolverService.registerTypes({
      buyType: {
        on: 'date',
        at: 'string',
        price: 'money-amount'
      },
      'Example Book': {
        bookName: 'string',
        author: 'string',
        nationality: 'country',
        bought: 'buyType',
        read: 'boolean'
      }
    });

    // We define the dont-code API as the storage unit for our elements
    this.apiProvider.apiUrl = 'https://test.dont-code.net/demo/data';
    this.storeMgr.setDefaultStoreProvider(this.apiProvider);

  }
}
