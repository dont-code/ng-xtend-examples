import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {registerDefaultPlugin} from 'xt-plugin-default';
import {XtResolverService} from 'xt-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  resolverService = inject(XtResolverService);
  protected title = 'Ng-Xtend Basic Example';

  constructor() {
      // We initialize the default plugin. Ng-Xtend framework will use it to handle primitives or generic object
    registerDefaultPlugin(this.resolverService);
  }
}
