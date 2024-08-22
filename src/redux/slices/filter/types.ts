export enum SortNames {
  POPULAR = 'популярности',
  ALPHABET = 'алфавиту',
  PRICE = 'цене',
}

export enum SortKeys {
  POPULAR = 'rating',
  ALPHABET = 'title',
  PRICE = 'price',
}

export interface SortItem {
  name: SortNames;
  sortKey: SortKeys;
}

export interface FilterSliceState {
  searchInput: string;
  selectedCategoryIndex: number;
  currentPage: number;
  isOrderByDesc: boolean;
  selectedSortItem: SortItem;
}
