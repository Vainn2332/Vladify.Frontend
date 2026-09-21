import { useState } from "react";
import { usePageSize } from "./usePageSize";

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function usePagination(): Pagination {
  const pageSize = usePageSize();
  const [pageNumber, setPageNumber] = useState(1);
  const [prevPageSize, setPrevPageSize] = useState(pageSize);

  // if we resize our window/screen => reset to first page(there was a bug when pagination was inconsistent).
  if (pageSize !== prevPageSize) {
    setPrevPageSize(pageSize);
    setPageNumber(1);
  }

  return {
    pageNumber,
    pageSize,
    goToNextPage: () => setPageNumber((page) => page + 1),
    goToPrevPage: () => setPageNumber((page) => Math.max(1, page - 1)),
  };
}
