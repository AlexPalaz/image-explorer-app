"use server";

import { FavoriteService } from "@/services/FavoriteService";
import { revalidatePath } from "next/cache";

export async function addFavorite(formData: FormData) {
  const photo_id = formData.get("photo_id") as string;

  await FavoriteService.addFavoritePhoto(
    photo_id,
    process.env.NEXT_PUBLIC_BASE_URL
  );
  revalidatePath("/");
}