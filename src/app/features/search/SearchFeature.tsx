"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import { ProviderRegistry } from "@/app/contexts/ProviderRegistry";
import {
  SearchProvider,
  useSearchDispatchContext,
} from "@/app/contexts/SearchContext";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchService } from "./SearchService";

function SearchFeatureContent() {
  const { updateResults } = useSearchDispatchContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue] = useDebounce(searchValue, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchPhotos = async (value: string) => {
    const result = await SearchService.getPhotos(value);
    if (result?.results?.length) {
      updateResults(result.results);
    }
  };

  useEffect(() => {
    fetchPhotos(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <SearchBar value={searchValue} onChange={handleSearchChange} />
    </>
  );
}

export default function SearchFeature() {
  return (
    <ProviderRegistry providers={[SearchProvider]}>
      <SearchFeatureContent />
    </ProviderRegistry>
  );
}
