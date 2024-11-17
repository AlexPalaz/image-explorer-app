"use server";

import { FavoriteService } from "@/services/FavoriteService";
import { UnsplashPhotoService } from "@/services/UnsplashPhotoService";
import { revalidatePath } from "next/cache";

export async function addFavorite(formData: FormData) {
  const photo_id = formData.get("photo_id") as string;
  const photo = await UnsplashPhotoService.getPhoto(
    photo_id,
    process.env.NEXT_PUBLIC_BASE_URL
  );

  if (photo) {
    await FavoriteService.addFavoritePhoto(
      photo_id,
      photo,
      process.env.NEXT_PUBLIC_BASE_URL
    );
  }

  revalidatePath("/");
}
