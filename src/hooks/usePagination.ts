import { useState } from "react";
import { usePageSize } from "./usePageSize";

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function usePagination(fetchedAmount: number): Pagination {
  const pageSize = usePageSize();
  const [pageNumber, setPageNumber] = useState(1);
  const [prevPageSize, setPrevPageSize] = useState(pageSize);

  // if we resize our window => reset to first page(there was be bug when pagination was inconsistent when switching page size).
  if (pageSize !== prevPageSize) {
    setPrevPageSize(pageSize);
    setPageNumber(1);
  }

  return {
    pageNumber,
    pageSize,
    hasNextPage: fetchedAmount === pageSize,
    goToNextPage: () => setPageNumber((page) => page + 1),
    goToPrevPage: () => setPageNumber((page) => page - 1),
  };
}
