import {AfterViewInit, Component, inject, OnInit, signal} from '@angular/core';
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
import {Author, Book} from '../model/types';

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
export class AdvancedTypeDisplay implements OnInit, AfterViewInit{

  resolver = inject(XtResolverService);

  selectedBook = signal<Book|null>(null);
  selectedBookID:string|null = null;

  selectedAuthor = signal<Author|null>(null);
  selectedAuthorID:string|null = null;

  formBuilder = inject(FormBuilder);

  bookForm= signal (this.formBuilder.group({
  }));

  authorForm= signal (this.formBuilder.group({
  }));

  // We use the ErrorHandlerService to display errors
  protected readonly errorHandler = inject(XtMessageHandler);

  // We use a XtSignalStore to manage the loading / storing of elements through the API
  storeMgr = inject(XtStoreManagerService);
  bookStore : XtSignalStore<Book> | null = null;
  authorStore : XtSignalStore<Author> | null = null;

  ngOnInit(): void {
    this.authorStore = this.storeMgr.getStoreFor("Example Author", this.resolver.typeResolver);
    this.bookStore = this.storeMgr.getStoreFor("Example Book", this.resolver.typeResolver);
    this.updateAuthorForm();
    this.updateBookForm();
  }

  ngAfterViewInit(): void {
    this.initStores();
  }

  async initStores () : Promise<void> {
    try {
      // We read the authors and books from the stores
      await this.authorStore?.fetchEntities();
      await this.bookStore?.fetchEntities();

    } catch(error) {
      this.errorHandler.errorOccurred(error, "Error loading Example Data from the APIs ");
      console.log('Loading done.');
    }
  }

  /**
   * Called whenever the list component has some outputs.
   * One of it, valueSelected, contains the currently selected entity.
   * @param newValue
   */
  bookOutputChanged(newValue: XtComponentOutput | null) {
    if (newValue?.valueSelected!=null) {
      // We listen to any change in the selection
      newValue?.valueSelected.subscribe (selected => {
        this.selectedBook.set(selected);
        this.updateBookForm();
        if (selected!=null)
          this.selectedBookID=selected._id;
        else
          this.selectedBookID=null;
      });
    }
  }

  /**
   * Called whenever the list component has some outputs.
   * One of it, valueSelected, contains the currently selected entity.
   * @param newValue
   */
  authorOutputChanged(newValue: XtComponentOutput | null) {
    if (newValue?.valueSelected!=null) {
      // We listen to any change in the selection
      newValue?.valueSelected.subscribe (selected => {
        this.selectedAuthor.set(selected);
        this.updateAuthorForm();
        if (selected!=null)
          this.selectedAuthorID=selected._id;
        else
          this.selectedAuthorID=null;
      });
    }
  }

  protected cancelBook() {
    this.bookForm().reset();
  }

  protected cancelAuthor() {
    this.authorForm().reset();
  }

  protected createBook() {
    const newBook={} as Book;
    //this.elementsToDisplay.update (elements => elements.concat(newBook));
    this.selectedBook.set(newBook);
    this.selectedBookID=null;
    this.updateBookForm();
  }

  protected saveBook() {
    this.selectedBook.set(this.bookForm().value as Book);
    // We now create or save through the APIs
    this.bookStore?.storeEntity(this.bookForm().value as Book).then((saved) => {
      if (saved?._id!=null) {
        this.selectedBookID=saved._id;
      }else {
        this.selectedBookID=null;
      }
    }).catch((error) => {
      this.errorHandler.errorOccurred(error, "Error saving Example Book ");
    });
  }

  protected updateBookForm() {
    const newForm=this.formBuilder.group({});
    updateFormGroupWithValue(newForm, this.selectedBook()??{}, 'Example Book', this.resolver.typeResolver );
    this.bookForm.set(newForm);
  }

  protected createAuthor() {
    const newAuthor={} as Author;
    //this.elementsToDisplay.update (elements => elements.concat(newBook));
    this.selectedAuthor.set(newAuthor);
    this.selectedAuthorID=null;
    this.updateAuthorForm();
  }

  protected saveAuthor() {
    this.selectedAuthor.set(this.authorForm().value as Author);
    // We now create or save through the APIs
    this.authorStore?.storeEntity(this.authorForm().value as Author).then((saved) => {
      if (saved?._id!=null) {
        this.selectedAuthorID=saved._id;
      }else {
        this.selectedAuthorID=null;
      }
    }).catch((error) => {
      this.errorHandler.errorOccurred(error, "Error saving Example Author.");
    });
  }

  protected updateAuthorForm() {
    const newForm=this.formBuilder.group({});
    updateFormGroupWithValue(newForm, this.selectedAuthor()??{}, 'Example Author', this.resolver.typeResolver );
    this.authorForm.set(newForm);
  }

  protected reloadBooks() {
    this.bookStore?.fetchEntities().then (() => {
      console.log('Reload Books done.');
    }).catch ((error) => {
      this.errorHandler.errorOccurred(error, "Error loading Example Books.");
    })
  }

  protected reloadAuthors() {
    this.authorStore?.fetchEntities().then (() => {
      console.log('Reload Authors done.');
    }).catch ((error) => {
      this.errorHandler.errorOccurred(error, "Error loading Example Authors.");
    })
  }
}
