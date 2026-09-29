import { useState } from "react";

const PAGINATION_SIZE = 12;

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function usePagination(): Pagination {
  const [pageNumber, setPageNumber] = useState(1);

  return {
    pageNumber,
    pageSize: PAGINATION_SIZE,
    goToNextPage: () => setPageNumber((page) => page + 1),
    goToPrevPage: () => setPageNumber((page) => Math.max(1, page - 1)),
  };
}
