// search value and filters for listings search

type Filters = {
  priceRange?: {
    min?: number; // e.g., 100000
    max?: number; // e.g., 500000
  };
  bedrooms?: number; // e.g., 3
  bathrooms?: number; // e.g., 2
  area?: {
    min?: number; // e.g., 1000
    max?: number; // e.g., 5000
  };
};
export type SearchState = {
  query: string;
  filters: Filters;
};
