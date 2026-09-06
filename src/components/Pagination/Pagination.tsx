interface paginationProps {
  pageNumber: number;
  hasMore: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export function Pagination({
  pageNumber,
  hasMore,
  onNextPage,
  onPrevPage,
}: paginationProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={pageNumber === 1}
        onClick={() => onPrevPage()}
        className="cursor-pointer rounded-lg px-2 ring-1 ring-black/20 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Prev
      </button>
      <span className="text-sm text-black/70">Page {pageNumber}</span>
      <button
        type="button"
        disabled={!hasMore}
        onClick={() => onNextPage()}
        className="cursor-pointer rounded-lg px-2 ring-1 ring-black/20 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
