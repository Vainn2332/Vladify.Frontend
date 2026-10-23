export interface PagedResult<T> {
  data: T[];
  hasNextPage: boolean;
}
