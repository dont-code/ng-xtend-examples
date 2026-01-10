import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';
import {registerInternationalPlugin} from 'xt-plugin-intl';
import {registerFinancePlugin} from 'xt-plugin-finance';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  resolverService = inject(XtResolverService);
  protected title = 'Ng-Xtend Store Example';

  constructor() {
      // We initialize the default plugin. Ng-Xtend framework will use it to handle primitives or generic object
    registerDefaultPlugin(this.resolverService);
      // We initialize as well the other plugins
    registerInternationalPlugin(this.resolverService);
    registerFinancePlugin(this.resolverService);

     // We change slightly the registration of the book type to reference types defined by the new plugins
    this.resolverService.registerTypes({
      buyType: {
        on: 'date',
        at: 'string',
        price: 'money-amount'
      },
      bookType: {
        bookName: 'string',
        author: 'string',
        nationality: 'country',
        bought: 'buyType',
        read: 'boolean'
      }
    })
  }
}
