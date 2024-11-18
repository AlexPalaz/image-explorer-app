import { GetUnsplashPhotos, UnsplashPhoto } from "@/types/Photos";

export const UnsplashPhotoService = {
  async getPhotos(
    term: string,
    page: number = 1,
    baseUrl: string = ""
  ): Promise<GetUnsplashPhotos | void> {
    try {
      const response = await fetch(
        `${baseUrl}/api/search?term=${encodeURIComponent(term)}&page=${page}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { results: [], total: 0, total_pages: 0 } as GetUnsplashPhotos;
    }
  },
  async getPhoto(
    id: string,
    baseUrl: string = ""
  ): Promise<UnsplashPhoto | void> {
    try {
      const response = await fetch(`${baseUrl}/api/photo?id=${id}`, {
        method: "GET",
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};
