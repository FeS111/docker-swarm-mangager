export interface PagingResult<T> {
  max: number;
  limit: number;
  offset: number;
  results: T;
}
