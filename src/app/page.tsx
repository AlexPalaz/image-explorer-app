import { generate } from "random-words";
import Section from "./components/Section/Section";
import { unsplash } from "./utils/unsplash";
import SearchFeature from "./features/search/SearchFeature";

export default async function Home() {
  return (
    <div className="mt-8 px-8">
      <Section>
        <SearchFeature />
      </Section>
    </div>
  );
}
