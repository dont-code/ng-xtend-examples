import {Component, inject, OnInit, signal} from '@angular/core';
import {updateFormGroupWithValue, XtRenderComponent, XtResolverService} from 'xt-components';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Card} from 'primeng/card';

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
  selector: 'app-basic-display',
  imports: [
    XtRenderComponent,
    ReactiveFormsModule,
    Card
  ],
  templateUrl: './basic-display.html',
  styleUrl: './basic-display.css',
})
export class BasicDisplay implements OnInit{

  elementToDisplay = signal<any>({
    bookName: 'The Lord of the Rings',
    author: 'J. R. R. Tolkien',
    nationality: 'UK',
    bought: {
      on: new Date('2005, 2, 1'),
      at: 'Library',
      price: 34
    },
    read: true
  });

  formBuilder = inject(FormBuilder);

  bookForm= this.formBuilder.group({
  });

  ngOnInit(): void {
    updateFormGroupWithValue(this.bookForm, this.elementToDisplay());
  }

}
