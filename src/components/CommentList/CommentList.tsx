import { Comment as CommentType } from "@/types/Comments";
import Comment from "../Comment/Comment";

export type CommentListProps = {
  comments: CommentType[];
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="grow md:h-0 overflow-y-auto">
      <h2 className="font-semibold sticky top-0 bg-white">Comments:</h2>
      <ul className="py-4 flex flex-col gap-2">
        {comments?.length ? (
          comments.map((comment, index) => (
            <li key={index} className="text-xs">
              <Comment
                username={comment.username}
                created_at={comment.created_at}
                comment={comment.comment}
              />
            </li>
          ))
        ) : (
          <div>No comments available</div>
        )}
      </ul>
    </div>
  );
}
