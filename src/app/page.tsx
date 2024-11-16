import { cookies } from "next/headers";
import Section from "./components/Section/Section";
import SearchFeature from "./features/search/SearchFeature";
import { createClient } from "./utils/supabase/server";

export default async function HomePage() {
  return (
    <div className="mt-8 px-8">
      <Section>
        <div className="text-center mb-8 font-semibold text-lg">
          Welcome to IEA!, an Image Explorer App where you can get images from
          Unsplash
        </div>
        <SearchFeature />
      </Section>
    </div>
  );
}
