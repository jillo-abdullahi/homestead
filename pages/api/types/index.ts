export type Nullable<T> = T | null | undefined;

export type ListingsFilter = {
  // filter query
  searchQuery?: Nullable<string>;

  // specific filters
  bedrooms?: Nullable<number>;
  bathrooms?: Nullable<number>;
  minArea?: Nullable<number>;
  maxArea?: Nullable<number>;
  minPrice?: Nullable<number>;
  maxPrice?: Nullable<number>;
};
