export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error'
}

export type Book = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export interface BooksSliceState {
  items: Book[];
  status: Status;
}

export type FetchBooksParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};
