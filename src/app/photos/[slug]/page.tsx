import Section from "@/components/Section/Section";
import AddFavoriteFeature from "@/features/favorites/AddFavoriteFeature";
import CommentFeature from "@/features/photos/comments/CommentFeature";
import DetailFeature from "@/features/photos/detail/DetailFeature";

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const photoId = (await params).slug;

  return (
    <div className="mt-8 px-8 mb-8">
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="max-w-[480px] relative m-auto">
            <DetailFeature id={photoId} />
            <div className="absolute top-2 right-2 md:bottom-2 md:top-auto">
              <AddFavoriteFeature id={photoId} />
            </div>
          </div>
          <div className="px-2 pb-2">
            <CommentFeature id={photoId} />
          </div>
        </div>
      </Section>
    </div>
  );
}
