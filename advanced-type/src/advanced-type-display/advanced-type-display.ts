import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {
  updateFormGroupWithValue,
  XtComponentOutput,
  XtMessageHandler,
  XtRenderComponent,
  XtResolverService
} from 'xt-components';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {XtSignalStore, XtStoreManagerService} from 'xt-store';
import {ManagedData} from 'xt-type';

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
  selector: 'app-advanced-type-display',
  imports: [
    XtRenderComponent,
    ReactiveFormsModule,
    Card,
    Button
  ],
  templateUrl: './advanced-type-display.html',
  styleUrl: './advanced-type-display.css',
})
export class StoreDisplay implements OnInit{

  resolver = inject(XtResolverService);

  selectedEntity = signal<any>(null);

  selectedEntityID:string|null = null;

  formBuilder = inject(FormBuilder);

  bookForm= signal (this.formBuilder.group({
  }));

  // We use the ErrorHandlerService to display errors
  protected readonly errorHandler = inject(XtMessageHandler);

  // We use a XtSignalStore to manage the loading / storing of elements through the API
  storeMgr = inject(XtStoreManagerService);
  store : XtSignalStore<ManagedData> | null = null;

  // Elements to display are now directly computed from the store
  elementsToDisplay = computed(() => this.store?.entities() ?? [])

  ngOnInit(): void {
    // We fist load the data from the Store
    this.store = this.storeMgr.getStoreFor("Example Book");
    this.store.fetchEntities().catch((error) => {
      this.errorHandler.errorOccurred(error, "Error loading Example Books ");
    }).finally(() => {
      console.log('Loading done.');
    });

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
          this.selectedEntityID=selected._id;
        else
          this.selectedEntityID=null;
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
    this.selectedEntityID=null;
    this.updateBookForm();
  }

  protected saveBook() {
    this.selectedEntity.set(this.bookForm().value);
    // We now create or save through the APIs
    this.store?.storeEntity(this.bookForm().value).then((saved) => {
      if (saved?._id!=null) {
        this.selectedEntityID=saved._id;
      }else {
        this.selectedEntityID=null;
      }
    }).catch((error) => {
      this.errorHandler.errorOccurred(error, "Error saving Example Book ");
    });
  }

  protected updateBookForm() {
    const newForm=this.formBuilder.group({});
    updateFormGroupWithValue(newForm, this.selectedEntity()??{}, 'Example Book', this.resolver.typeResolver );
    this.bookForm.set(newForm);
  }

  protected reloadBooks() {
    this.store?.fetchEntities().then (() => {
      console.log('Reload done.');
    }).catch ((error) => {
      this.errorHandler.errorOccurred(error, "Error loading Example Books ");
    })
  }
}
