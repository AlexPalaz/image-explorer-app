"use server";

import { getUser } from "@/utils/supabase/server";
import { CommentService } from "@/services/CommentService";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const user = await getUser();
  const username = user?.user_metadata?.email;
  const photo_id = formData.get("photo_id") as string;
  const comment = formData.get("comment") as string;

  await CommentService.addPhotoComment(
    username,
    photo_id,
    comment,
    process.env.NEXT_PUBLIC_BASE_URL
  );
  revalidatePath("/");
}
