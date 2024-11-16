import PhotoDetail from "@/app/components/PhotoDetail/PhotoDetail";
import { UnsplashPhotoService } from "@/app/services/UnsplashPhotoService";

export type PhotoDetailFeatureProps = {
  id: string;
};

export default async function PhotoDetailFeature({
  id,
}: PhotoDetailFeatureProps) {
  if (!id) return null;

  const photo = await UnsplashPhotoService.getPhoto(
    id,
    process.env.NEXT_PUBLIC_BASE_URL
  );

  if (!photo) return "Image not available";

  return (
    <div>
      <PhotoDetail photo={photo} />
    </div>
  );
}
