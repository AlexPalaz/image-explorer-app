import { Comment, CreatedComment } from "@/types/Comments";

export const CommentService = {
  async getPhotoComments(
    id: string,
    baseUrl: string = ""
  ): Promise<Comment[] | undefined> {
    try {
      const response = await fetch(`${baseUrl}/api/photo/comments?id=${id}`, {
        method: "GET",
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async addPhotoComment(
    username: string,
    photo_id: string,
    comment: string,
    baseUrl: string = ""
  ): Promise<CreatedComment | undefined> {
    try {
      const response = await fetch(`${baseUrl}/api/photo/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, photo_id, comment }),
      });

      if (!response.ok) {
        throw new Error(`Error adding comment: ${response.statusText}`);
      }

      return (await response.json()) as CreatedComment;
    } catch (error) {
      console.error(error);
    }
  },
};
