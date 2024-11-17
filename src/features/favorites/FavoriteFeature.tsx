import { FavoriteService } from "@/services/FavoriteService";
import { getUser } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function FavoriteFeature() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const favorites = await FavoriteService.getFavoritePhotos(
    user.id,
    process.env.NEXT_PUBLIC_BASE_URL
  );

  if (!favorites?.length) {
    return "No favorite photos here";
  }

  return (
    <div className="favorite flex flex-col gap-2">
      {favorites.map((favorite, i) => {
        return (
          <Link
            href={"/photos/" + favorite.photo_id}
            className="w-full border rounded flex gap-6 p-2 items-center"
          >
            <Image
              className="rounded"
              width={200}
              height={200}
              alt={favorite.photo.alt_description || ""}
              src={favorite.photo.urls.small}
            />
            <div>
              <h4 className="text-sm mb-4">
                <b>Saved:</b>
                {new Date(favorite.created_at).toLocaleDateString("en-US")}
              </h4>
              <h3 className="text-sm">
                <b>Author: </b>
                {favorite.photo.user.first_name} {favorite.photo.user.last_name}
              </h3>
              {favorite.photo.description && (
                <p className="text-sm">
                  <b>Description: </b>
                  {favorite.photo.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
