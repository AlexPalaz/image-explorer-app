import Section from "@/app/components/Section/Section";
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
        <PhotoDetailFeature id={photoId} />
      </Section>
    </div>
  );
}
