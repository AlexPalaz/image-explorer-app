import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { getUser } from "@/utils/supabase/server";
import Form from "next/form";
import { addComment } from "./actions";
import CommentList from "@/components/CommentList/CommentList";
import { CommentService } from "@/services/CommentService";

export type CommentsFeatureProps = {
  id: string;
};

export default async function CommentFeature({ id }: CommentsFeatureProps) {
  const comments =
    (await CommentService.getPhotoComments(
      id,
      process.env.NEXT_PUBLIC_BASE_URL
    )) || [];

  const user = await getUser();

  return (
    <div className="flex flex-col justify-between h-full">
      <CommentList comments={comments} />
      <Form className="flex flex-col gap-4" action={addComment}>
        <input name="photo_id" className="hidden" defaultValue={id} />
        <textarea
          name="comment"
          required
          rows={4}
          className="resize-none block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border outline-none"
          placeholder="Write your thoughts here..."
        ></textarea>
        <div className="flex gap-2 items-center">
          <SubmitButton label="Add comment" disabled={!user} />
          {!user && <span className="text-xs">Sign in to add comments</span>}
        </div>
      </Form>
    </div>
  );
}
