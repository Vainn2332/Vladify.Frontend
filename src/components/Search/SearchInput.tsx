import { useEffect, useRef, useState, type ComponentPropsWithRef } from "react";
import { SearchResult } from "./SearchResult";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import {
  MIN_SEARCH_QUERY_LENGTH,
  searchQuery,
} from "../../api/search/searchQuery";

const DELAY_MS = 300;

export function SearchInput({
  className,
  ...props
}: ComponentPropsWithRef<"input">) {
  const [searchResultIsOpen, setSearchResultIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, DELAY_MS);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, error, isError } = useQuery(
    searchQuery.search(debouncedQuery.trim()),
  );

  useEffect(() => {
    if (!searchResultIsOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setSearchResultIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [searchResultIsOpen]);

  const showResults =
    searchResultIsOpen &&
    debouncedQuery.trim().length >= MIN_SEARCH_QUERY_LENGTH &&
    data !== undefined;

  if (isError) {
    console.log(error);
  }
  return (
    <div ref={containerRef} className={`sm:relative ${className}`}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        {...props}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearchResultIsOpen(true);
        }}
        onFocus={() => setSearchResultIsOpen(true)}
        className="w-full rounded-2xl bg-white/85 py-1 text-center text-cyan-950 shadow-sm backdrop-blur-md transition-colors duration-200 outline-none hover:bg-white/70 focus:bg-white/70"
      />
      {showResults && (
        <SearchResult
          searchResult={data}
          onClick={(id) => console.log(`id clicked: ${id}`)}
          onClose={() => setSearchResultIsOpen(false)}
        />
      )}
    </div>
  );
}
