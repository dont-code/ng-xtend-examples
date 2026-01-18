import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';
import {registerInternationalPlugin} from 'xt-plugin-intl';
import {registerFinancePlugin} from 'xt-plugin-finance';
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

  protected title = 'Ng-Xtend Advanced Type Example';

  constructor() {
      // We initialize the default plugin. Ng-Xtend framework will use it to handle primitives or generic object
    registerDefaultPlugin(this.resolverService);
      // We initialize as well the other plugins
    registerInternationalPlugin(this.resolverService);
    registerFinancePlugin(this.resolverService);

     // We reference the author type from the book type with a many-to-one relationship
    this.resolverService.registerTypes({
      buyType: {
        on: 'date',
        at: 'string',
        price: 'money-amount'
      },
      'Example Author': {
        displayTemplate: '<%=it.name%> <%if (it.born!=null) {%>(<%=it.born.getFullYear()%>)<%}%>',
        children:{
          name: 'string',
          born: 'date',
          nationality: 'country',
        }
      },
      'Example Book': {
        children: {
          bookName: 'string',
          author: {
            toType: 'Example Author',
            field: 'name',
            referenceType:'MANY-TO-ONE'
          },
          nationality: 'country',
          bought: 'buyType',
          read: 'boolean'
        }
      }
    });

      // Ensure the references are resolved
    this.resolverService.resolvePendingReferences();

    // We define the dont-code API as the storage unit for our elements
    this.apiProvider.apiUrl = 'https://test.dont-code.net/demo/data';
    this.storeMgr.setDefaultStoreProvider(this.apiProvider);

  }
}
