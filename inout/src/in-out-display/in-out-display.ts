import {Component, effect, inject, model, OnInit, signal, untracked} from '@angular/core';
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
  selector: 'app-inout-display',
  imports: [
    XtRenderComponent,
    ReactiveFormsModule,
    Card,
    Button
  ],
  templateUrl: './in-out-display.html',
  styleUrl: './in-out-display.css',
})
export class InOutDisplay implements OnInit{

  resolver = inject(XtResolverService);
  elementsToDisplay = signal<any[]>([]);

  selectedEntity = signal<any>(null);

  selectedEntityIndex = -1;

  valueSelectedModel = model<any>(null);

  formBuilder = inject(FormBuilder);

  bookForm= signal (this.formBuilder.group({
  }));

  constructor() {
    effect(() => {
      const selected = this.valueSelectedModel();
      untracked(() => {
        this.selectedEntity.set(selected);
        this.updateBookForm();
      });
      if (selected!=null)
        this.selectedEntityIndex = untracked(() => this.elementsToDisplay().indexOf(selected));
      else
        this.selectedEntityIndex=-1;
    });
  }

  ngOnInit(): void {
    this.updateBookForm();
  }

  protected cancelBook() {
    this.bookForm().reset();
  }

  protected createBook() {
    const newBook={};
    //this.elementsToDisplay.update (elements => elements.concat(newBook));
    this.selectedEntity.set(newBook);
    this.selectedEntityIndex=-1;
    this.updateBookForm();
  }

  protected saveBook() {
    this.selectedEntity.set(this.bookForm().value);
    if (this.selectedEntityIndex==-1){
      this.elementsToDisplay.update (elements => elements.concat(this.bookForm().value));
      this.selectedEntityIndex=this.elementsToDisplay().length-1;
    }
    else {
      this.elementsToDisplay.update (elements => {
        elements[this.selectedEntityIndex]=this.bookForm().value;
        return [...elements];
      });

    }
  }

  protected updateBookForm() {
    const newForm=this.formBuilder.group({});
    updateFormGroupWithValue(newForm, this.selectedEntity()??{}, 'bookType', this.resolver.typeResolver );
    this.bookForm.set(newForm);
  }
}
