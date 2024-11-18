import PhotoDetail from "@/components/PhotoDetail/PhotoDetail";
import { UnsplashPhoto } from "@/types/Photos";

export type PhotoDetailFeatureProps = {
  photo: UnsplashPhoto | void;
};

export default async function DetailFeature({
  photo,
}: PhotoDetailFeatureProps) {
  if (!photo) return "Image not available";

  return <PhotoDetail photo={photo} />;
}
