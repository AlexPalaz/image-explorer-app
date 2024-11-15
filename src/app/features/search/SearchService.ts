import { GetUnsplashPhotos } from "@/app/types/Photos";
import { generate } from "random-words";

export const SearchService = {
  async getPhotos(term: string): Promise<GetUnsplashPhotos | undefined> {
    const searchTerm = term || (generate() as string);
    try {
      const response = await fetch(
        `/api/search?term=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
