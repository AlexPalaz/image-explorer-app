"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import { ProviderRegistry } from "@/app/contexts/ProviderRegistry";
import {
  SearchProvider,
  useSearchContext,
  useSearchDispatchContext,
} from "@/app/contexts/SearchContext";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchService } from "./SearchService";
import SearchContents from "@/app/components/SearchContents/SearchContents";
import Pagination from "../../components/Pagination/Pagination";

function SearchFeatureContent() {
  const { results, term, page, pages } = useSearchContext();
  const { updateTerm, updateResults, updatePage, updateTotalPages } =
    useSearchDispatchContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue] = useDebounce(searchValue, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (page: number) => {
    updatePage(page);
  };

  const fetchPhotos = async (value: string, page: number) => {
    const result = await SearchService.getPhotos(value, page);
    if (result?.results?.length) {
      updateResults(result.results);
      updateTotalPages(result.total_pages);
    }
  };

  useEffect(() => {
    fetchPhotos(term, page);
  }, [term, page]);

  useEffect(() => {
    if (debouncedValue) {
      updateTerm(debouncedValue);
      updatePage(1);
    }
  }, [debouncedValue]);

  return (
    <div className="flex flex-col gap-12 items-center">
      <SearchBar value={searchValue} onChange={handleSearchChange} />
      <SearchContents photos={results} />
      <Pagination onPageChange={handlePageChange} page={page} pages={pages} />
    </div>
  );
}

export default function SearchFeature() {
  return (
    <ProviderRegistry providers={[SearchProvider]}>
      <SearchFeatureContent />
    </ProviderRegistry>
  );
}
