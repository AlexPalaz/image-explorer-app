export type Favorite = {
  id: number;
  created_at: string;
  user_id: string;
  photo_id: string;
};

export type CreatedFavorite = {
  message: string;
  data: Favorite[];
};
