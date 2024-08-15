export const dynamic = "force-dynamic";
import SearchBar from "@/components/explore/search-bar";
import ExploreContent from "@/components/explore/explore-content";
import FilterAccordion from "@/components/explore/filter-accordion";
import ResultFor from "@/components/explore/results-for";
import axios from "axios";
import { headers } from "next/headers";

export interface ExploreProps {
  searchParams?: {
    name?: string;
    page?: string;
    category_id?: string;
    min_rating?: string;
    difficulty?: string;
  };
}

export default async function Explore({ searchParams }: ExploreProps) {
  const uniqueCategory = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`,
    
  );

  const data = uniqueCategory.data;

  return (
    <div className="flex flex-col items-center min-h-screen pt-8">
      <div className="w-full max-w-6xl px-4 py-4 flex justify-start">
        <div className="w-3/4 pb-4">
          <SearchBar />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-6xl px-4">
        <div className="w-full md:w-1/4 pr-4 mb-4 md:mb-0">
          <div className="md:sticky md:top-4">
            <ResultFor />
            <FilterAccordion categories={data.categories} />
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <ExploreContent courseSearchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
