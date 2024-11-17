import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Form from "next/form";
import { addFavorite } from "./actions";
import {
  FavoritedSolidIcon,
  FavoriteOutlineIcon,
} from "@/components/Icons/Icons";
import { FavoriteService } from "@/services/FavoriteService";
import { getUser } from "@/utils/supabase/server";
import { UnsplashPhotoService } from "@/services/UnsplashPhotoService";

export type AddFavoriteFeatureProps = {
  id: string;
};

export default async function AddFavoriteFeature({
  id,
}: AddFavoriteFeatureProps) {
  const user = await getUser();

  if (!user) {
    return (
      <Form action="/auth/signin">
        <SubmitButton label={<FavoritedSolidIcon />} />
      </Form>
    );
  }

  const favorites = await FavoriteService.getFavoritePhotos(
    user.id,
    process.env.NEXT_PUBLIC_BASE_URL
  );

  const favorite = favorites?.find(
    (f) => f.photo_id === id && f.user_id === user.id
  );

  if (favorite) {
    return <SubmitButton label={<FavoritedSolidIcon />} disabled />;
  }

  return (
    <div>
      <Form action={addFavorite}>
        <input
          type="text"
          name="photo_id"
          defaultValue={id}
          className="hidden"
        />
        <SubmitButton label={<FavoriteOutlineIcon />} />
      </Form>
    </div>
  );
}
