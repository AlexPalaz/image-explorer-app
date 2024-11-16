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

function SearchFeatureContent() {
  const { results, page, pages } = useSearchContext();
  const { updateResults, updateTotalPages } = useSearchDispatchContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue] = useDebounce(searchValue, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchPhotos = async (value: string) => {
    const result = await SearchService.getPhotos(value);
    if (result?.results?.length) {
      updateResults(result.results);
      updateTotalPages(result.total_pages);
    }
  };

  useEffect(() => {
    fetchPhotos(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="flex flex-col gap-12">
      <SearchBar value={searchValue} onChange={handleSearchChange} />
      <SearchContents photos={results} />
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
