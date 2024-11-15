import { UnsplashPhoto } from "@/app/types/Photos";

export type SearchContentsProps = {
  photos: UnsplashPhoto[];
};

export default function SearchContents({ photos }: SearchContentsProps) {
  return <div className="contents">{photos.map((photo) => {
    return (<div></div>)
  })}</div>;
}
