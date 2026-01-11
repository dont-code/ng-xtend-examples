import {Component, inject, OnInit, signal} from '@angular/core';
import {updateFormGroupWithValue, XtComponentOutput, XtRenderComponent, XtResolverService} from 'xt-components';
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

  formBuilder = inject(FormBuilder);

  bookForm= signal (this.formBuilder.group({
  }));

  ngOnInit(): void {
    this.updateBookForm();
  }

  /**
   * Called whenever the list component has some outputs.
   * One of it, valueSelected, contains the currently selected entity.
   * @param newValue
   */
  outputChanged(newValue: XtComponentOutput | null) {
    if (newValue?.valueSelected!=null) {
      // We listen to any change in the selection
      newValue?.valueSelected.subscribe (selected => {
        this.selectedEntity.set(selected);
        this.updateBookForm();
        if (selected!=null)
          this.selectedEntityIndex=this.elementsToDisplay().indexOf(selected);
        else
          this.selectedEntityIndex=-1;
      });
    }
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
