# ![ng-xtend logo](public/logo.png) In-Out Example

This example shows how to **connect two unrelated components** — a list and an editor — without either knowing about the other. It introduces ng-xtend's output system, which lets you react to user interactions inside a rendered component (like selecting an item from a list).

---

## Step 1: Listen to list selection

In the template ([`src/in-out-display/in-out-display.html`](https://github.com/dont-code/ng-xtend-examples/blob/main/inout/src/in-out-display/in-out-display.html)), bind to the `(outputs)` event on the list `<xt-render>`:

```html
<xt-render displayMode="LIST_VIEW" valueType="bookType"
           [value]="elementsToDisplay()"
           (outputs)="outputChanged($event)">
</xt-render>
```

The `(outputs)` emitter fires whenever the rendered component emits an event. The payload is an `XtComponentOutput` object containing named observables — most importantly `valueSelected`, which fires when the user selects an item.

---

## Step 2: Forward selection to the editor

In [`src/in-out-display/in-out-display.ts`](https://github.com/dont-code/ng-xtend-examples/blob/main/inout/src/in-out-display/in-out-display.ts):

```typescript
outputChanged(newValue: XtComponentOutput | null) {
  if (newValue?.valueSelected != null) {
    newValue.valueSelected.subscribe(selected => {
      this.selectedEntity.set(selected);
      this.updateBookForm();
      this.selectedEntityIndex = this.elementsToDisplay().indexOf(selected);
    });
  }
}
```

**Why subscribe instead of a direct value?** The output system uses observables because `XtRenderComponent` dynamically instantiates child components. The `valueSelected` observable emits every time the selection changes (click a different row, deselect, etc.). Subscribing gives you a stream of selection changes.

`updateBookForm()` then rebuilds the edit form with the selected entity's data:

```typescript
protected updateBookForm() {
  const newForm = this.formBuilder.group({});
  updateFormGroupWithValue(newForm, this.selectedEntity() ?? {},
    'bookType', this.resolver.typeResolver);
  this.bookForm.set(newForm);
}
```

---

## Step 3: Create and save with form management

The form now supports both **create** and **update** via the same form:

```html
<form [formGroup]="bookForm()" (ngSubmit)="saveBook()">
  <xt-render displayMode="FULL_EDITABLE" valueType="bookType"
             [formGroup]="bookForm()"> </xt-render>
  <p-button label="Save" type="submit" />
</form>
```

`createBook()` sets `selectedEntity` to an empty object, clearing the form for a new entry. `saveBook()` distinguishes create from update by checking `selectedEntityIndex`: if -1, it appends a new book; otherwise it replaces the existing entry in the array.

**Key change from the typed example:** The form is now a `signal<FormGroup>` rather than a plain `FormGroup`, because it needs to be rebuilt each time the selection changes. The `bookForm` signal is swapped out via `bookForm.set(newForm)`.

---

## Summary

| Concept | What changes |
|---------|-------------|
| **`(outputs)` binding** | Listen to events from rendered components |
| **`valueSelected`** | Observable that fires when the user picks an item from the list |
| **Two-way data flow** | List selection → form population → save updates the list |
| **`signal<FormGroup>`** | Form needs to be reactive because it is rebuilt dynamically |
| **Create vs update** | Same form handles both; distinguished by index |

### What's next?

| Example | What it adds |
|---------|-------------|
| [Store Example](store.html) | Persist books via an API using `xt-store` instead of an in-memory array |
| [Advanced Type Example](advanced-type.html) | Reference authors from books with a MANY-TO-ONE relation |
| [Dynamic Plugin Example](dynamic.html) | Load plugins at runtime from a remote server instead of bundling them |
