export type Comment = {
  id: number;
  created_at: string;
  comment: string;
  photo_id: string;
  username: string;
}

export type CreatedComment = {
  message: string;
  data: Comment[];
}