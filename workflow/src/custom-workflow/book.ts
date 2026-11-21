import {ManagedData} from 'xt-type';

/**
 * The entity displayed by the custom workflow.
 *
 * Extending ManagedData gives the store a stable `_id` so entities can be
 * created, updated and deleted through XtStore.
 */
export type Book = ManagedData & {
  bookName: string;
  author: string;
  read: boolean;
};
