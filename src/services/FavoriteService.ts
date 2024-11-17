import { CreatedFavorite, Favorite } from "@/types/Favorites";
import { cookies } from "next/headers";

export const FavoriteService = {
  async getFavoritePhotos(
    userId: string,
    baseUrl: string = ""
  ): Promise<Favorite[] | undefined> {
    try {
      const response = await fetch(`${baseUrl}/api/favorites?id=${userId}`, {
        method: "GET",
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async addFavoritePhoto(
    photo_id: string,
    baseUrl: string = ""
  ): Promise<CreatedFavorite | undefined> {
    try {
      const token = (await cookies()).get("access-token")?.value || "";
      const response = await fetch(`${baseUrl}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ photo_id }),
      });

      if (!response.ok) {
        throw new Error(`Error adding comment: ${response.statusText}`);
      }

      return (await response.json()) as CreatedFavorite;
    } catch (error) {
      console.error(error);
    }
  },
};
