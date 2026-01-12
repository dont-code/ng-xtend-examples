import {ManagedData} from 'xt-type';

export type Book= ManagedData &{
  bookName: string;
  author?: Author;
  nationality?: string;
  bought?: Buy;
  read?: boolean;
}

export type Author= ManagedData &{
  name: string;
  born?: Date;
  nationality?: string;
}

export type Buy= ManagedData &{
  on: Date;
  at: string;
  price: number;
}

