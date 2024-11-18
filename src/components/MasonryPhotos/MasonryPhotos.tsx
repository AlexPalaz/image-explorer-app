import { UnsplashPhoto } from "@/types/Photos";
import Image from "next/image";
import Link from "next/link";

export type MasonryPhotosProps = {
  photos: UnsplashPhoto[];
};

export default function MasonryPhotos({ photos }: MasonryPhotosProps) {
  return photos ? (
    <div className="search-content masonry sm:masonry-sm md:masonry-md">
      {photos.map((photo, i) => {
        return (
          <div
            className="py-4 break-inside cursor-pointer"
            key={`image-content-${i}`}
          >
            <div className="border rounded-md overflow-hidden">
              <Link href={`/photos/${photo.id}`}>
                <Image
                  className="hover:scale-110 transition-all duration-300"
                  key={`image-content-${i}`}
                  width={photo.width}
                  height={photo.height}
                  src={photo.urls.small}
                  alt={photo.alt_description || ""}
                  unoptimized
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    "No data available"
  );
}
