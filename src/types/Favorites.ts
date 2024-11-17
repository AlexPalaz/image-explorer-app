import { UnsplashPhoto } from "./Photos";

export type Favorite = {
  id: number;
  created_at: string;
  user_id: string;
  photo_id: string;
  photo: UnsplashPhoto;
};

export type CreatedFavorite = {
  message: string;
  data: Favorite[];
};
