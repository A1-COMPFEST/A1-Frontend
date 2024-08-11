import SearchBar from "@/components/explore/search-bar";
import ExploreContent from "@/components/explore/explore-content";
import FilterAccordion from "@/components/explore/filter-accordion";
import ResultFor from "@/components/explore/results-for";

export interface ExploreProps {
  searchParams?: {
    name?: string;
    page?: string;
    category?: string;
    min_rating?: string;
    difficulty?: string;
  };
}

export default async function Explore({ searchParams }: ExploreProps) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-8">
      <div className="w-full max-w-6xl px-4 py-4 flex justify-start">
        <div className="w-3/4 pb-4">
          <SearchBar />
        </div>
      </div>
      <div className="flex w-full max-w-6xl px-4">
        <div className="w-1/4 pr-4">
          <div className="sticky top-4">
            <ResultFor />
            <FilterAccordion />
          </div>
        </div>
        <div className="w-3/4">
          <ExploreContent courseSearchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
