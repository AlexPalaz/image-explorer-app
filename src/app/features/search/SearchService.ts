import { GetUnsplashPhotos } from "@/app/types/Photos";

export const SearchService = {
  async getPhotos(
    term: string,
    page: number = 1
  ): Promise<GetUnsplashPhotos | undefined> {
    const searchTerm = term;
    try {
      const response = await fetch(
        `/api/search?term=${encodeURIComponent(searchTerm)}&page=${page}`,
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
