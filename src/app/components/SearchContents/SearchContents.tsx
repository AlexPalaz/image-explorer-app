import { UnsplashPhoto } from "@/app/types/Photos";
import Image from "next/image";
import Link from "next/link";

export type SearchContentsProps = {
  photos: UnsplashPhoto[];
};

export default function SearchContents({ photos }: SearchContentsProps) {
  return photos?.length ? (
    <div className="search-content masonry sm:masonry-sm md:masonry-md">
      {photos.map((photo, i) => {
        return (
          <div
            className="py-4 break-inside cursor-pointer"
            key={`image-content-${i}`}
          >
            <div className="border rounded-md overflow-hidden">
              <Link href={`/images/detail/${photo.slug}`}>
                <Image
                  className="hover:scale-110 transition-all duration-300"
                  key={`image-content-${i}`}
                  width={photo.width}
                  height={photo.height}
                  src={photo.urls.regular}
                  alt={photo.alt_description || ""}
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  ) : photos?.length === 0 ? (
    <div>No data available</div>
  ) : null;
}
