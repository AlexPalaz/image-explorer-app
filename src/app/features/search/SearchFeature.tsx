"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import { ProviderRegistry } from "@/app/contexts/ProviderRegistry";
import {
  SearchProvider,
  useSearchContext,
  useSearchDispatchContext,
} from "@/app/contexts/SearchContext";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Pagination from "../../components/Pagination/Pagination";
import MasonryPhotos from "@/app/components/MasonryPhotos/MasonryPhotos";
import { UnsplashPhotoService } from "@/app/services/UnsplashPhotoService";

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
    window.scrollTo({ top: 0 });
  };

  const fetchPhotos = useCallback(
    async (term: string, page: number) => {
      const result = await UnsplashPhotoService.getPhotos(term, page);
      if (result?.results) {
        updateResults(result.results);
      }

      if (result?.total_pages) {
        updateTotalPages(result.total_pages);
      }
    },
    [updateResults, updateTotalPages]
  );

  useEffect(() => {
    if (term) {
      fetchPhotos(term, page);
    }
  }, [term, page, fetchPhotos]);

  useEffect(() => {
    updateTerm(debouncedValue);
    updatePage(1);
  }, [debouncedValue, updatePage, updateTerm]);

  return (
    <div className="flex flex-col gap-12 items-center">
      <SearchBar value={searchValue} onChange={handleSearchChange} />
      <MasonryPhotos photos={results} />
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
