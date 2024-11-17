export type CommentProps = {
  created_at: string;
  username: string;
  comment: string;
};

export default function Comment({
  created_at,
  username,
  comment,
}: CommentProps) {
  const date = new Date(created_at).toLocaleDateString("en-US");

  return (
    <span>
      <b>
        {date} {username}
      </b>
      : {comment}
    </span>
  );
}
