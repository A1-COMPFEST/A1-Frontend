import { ExploreProps } from "@/app/explore/page";
import LongCourseCard from "./long-course-card";
import PaginationClient from "../pagination-client";
import axios from "axios";

export default async function ExploreContent({
  courseSearchParams,
}: {
  courseSearchParams: ExploreProps["searchParams"];
}) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/filter`);

  if (courseSearchParams) {
    if (courseSearchParams.name) {
      url.searchParams.append("name", courseSearchParams.name);
    }
    if (courseSearchParams.page) {
      url.searchParams.append("page", courseSearchParams.page);
    }
    if (courseSearchParams.category_id) {
      url.searchParams.append("category_id", courseSearchParams.category_id);
    }
    if (courseSearchParams.min_rating) {
      url.searchParams.append("min_rating", courseSearchParams.min_rating);
    }
    if (courseSearchParams.difficulty) {
      url.searchParams.append("difficulty", courseSearchParams.difficulty);
    }
  }

  const response = await axios.get(url.toString());
  const data =  response.data;
  console.log(data);

  return (
    <div className="flex flex-col gap-4 justify-center items-center mb-8">
      {data.courses.map((course: any) => (
        <LongCourseCard
          key={course.id}
          id={course.id}
          name={course.name}
          instructor_name={course.instructor_name}
          syllabus={course.syllabus}
          price={course.price}
          image={course.image}
          rating={course.average_rating}
          level={course.level}
        />
      ))}
      {/* Centering the pagination */}
      <div className="flex ">
        <PaginationClient
          last_page={data.last_page}
          current_page={data.current_page}
        />
      </div>
    </div>
  );
}
