import { useCallback, useState } from "react";
import { usePageSize } from "./usePageSize";

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  /** Сообщить, сколько элементов пришло — хук сам решит, есть ли следующая страница. */
  reportLoadedCount: (count: number) => void;
}

export function usePagination(): Pagination {
  const pageSize = usePageSize();
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [prevPageSize, setPrevPageSize] = useState(pageSize);

  // Смена брейкпоинта → размер страницы другой → начинаем с первой страницы.
  if (pageSize !== prevPageSize) {
    setPrevPageSize(pageSize);
    setPageNumber(1);
  }

  const reportLoadedCount = useCallback(
    (count: number) => setHasNextPage(count === pageSize),
    [pageSize],
  );

  return {
    pageNumber,
    pageSize,
    hasNextPage,
    goToNextPage: () => setPageNumber((page) => page + 1),
    goToPrevPage: () => setPageNumber((page) => page - 1),
    reportLoadedCount,
  };
}
