"use server";

import { CommentService } from "@/services/CommentService";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const photo_id = formData.get("photo_id") as string;
  const comment = formData.get("comment") as string;

  await CommentService.addPhotoComment(
    photo_id,
    comment,
    process.env.NEXT_PUBLIC_BASE_URL
  );
  revalidatePath("/");
}
