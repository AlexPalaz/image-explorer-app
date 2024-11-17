import { UnsplashPhoto } from "@/types/Photos";
import Image from "next/image";

export type PhotoDetailProps = {
  photo: UnsplashPhoto;
};

export default function PhotoDetail({ photo }: PhotoDetailProps) {
  return (
    <div className="border rounded overflow-hidden h-max">
      <Image
        src={photo.urls.regular}
        width={photo.width}
        height={photo.height}
        alt={photo.alt_description || ""}
      />
      <div className="px-4 mt-4 mb-2">
        <h3 className="font-semibold">
          Author:{" "}
          <b>
            {photo.user.first_name} {photo.user.last_name || ""}
          </b>
        </h3>
        {photo.user.instagram_username && (
          <h4 className="font-semibold text-sm">
            <b>@{photo.user.instagram_username}</b>
          </h4>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Location: {photo?.user?.location || "Unknown"}
        </p>
        <p className="mt-4 text-gray-800 text-sm">
          {photo.description || "No description available for this photo."}
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <b>Likes:</b> {photo.likes}
          </p>
          <p className="text-sm text-gray-500">
            <b>Published on:</b>{" "}
            {new Date(photo.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-6">
          <a
            href={photo.links.html}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-xs"
          >
            View on Unsplash
          </a>
        </div>
      </div>
    </div>
  );
}
