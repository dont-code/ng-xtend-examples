import {Component, inject, OnInit, signal} from '@angular/core';
import {updateFormGroupWithValue, XtRenderComponent, XtResolverService} from 'xt-components';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';

/**
 * We just display a static value (elementToDisplay) 3 times:
 * - As a list
 * - As a Card
 * - In an editable form
 *
 * You can play around and change the value, you'll see Ng-Xtend will adapt to any value.
 * As we only have the default plugin registered, the display is quite generic
 */
@Component({
  selector: 'app-plugin-display',
  imports: [
    XtRenderComponent,
    ReactiveFormsModule,
    Card,
    Button
  ],
  templateUrl: './plugin-display.html',
  styleUrl: './plugin-display.css',
})
export class PluginDisplay implements OnInit{

  resolver = inject(XtResolverService);
  elementsToDisplay = signal<any[]>([]);

  formBuilder = inject(FormBuilder);

  bookForm= this.formBuilder.group({
  });

  ngOnInit(): void {
    updateFormGroupWithValue(this.bookForm, {}, 'bookType', this.resolver.typeResolver );
  }

  protected cancelBook() {
    this.bookForm.reset();
  }

  protected createBook() {
    this.elementsToDisplay.update (elements => elements.concat(this.bookForm.value));
    this.bookForm.reset();
  }
}
