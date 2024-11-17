import Section from "@/app/components/Section/Section";
import CommentFeature from "@/app/features/photos/comments/CommentFeature";
import PhotoDetailFeature from "@/app/features/photos/detail/DetailFeature";

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const photoId = (await params).slug;

  return (
    <div className="mt-8 px-8 mb-8">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PhotoDetailFeature id={photoId} />
          <CommentFeature id={photoId} />
        </div>
      </Section>
    </div>
  );
}
