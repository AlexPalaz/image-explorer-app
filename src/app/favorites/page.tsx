import Section from "@/components/Section/Section";
import FavoriteFeature from "@/features/favorites/FavoriteFeature";

export default function FavoritesPage() {
  return (
    <Section>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-8">Here's your favorite photos:</h2>
        <div>
          <FavoriteFeature />
        </div>
      </div>
    </Section>
  );
}
