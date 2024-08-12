import { ExploreProps } from "@/app/explore/page";
import LongCourseCard from "./long-course-card";

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
    if (courseSearchParams.category) {
      url.searchParams.append("category", courseSearchParams.category);
    }
    if (courseSearchParams.min_rating) {
      url.searchParams.append("min_rating", courseSearchParams.min_rating);
    }
    if (courseSearchParams.difficulty) {
      url.searchParams.append("difficulty", courseSearchParams.difficulty);
    }
  }

  const response = await fetch(url.toString());
  const data = await response.json();

  console.log(data);
  console.log(url.toString());
  console.log("tesss");
  return (
    <div className="flex flex-col gap-4">
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
              level={course.level}/>
        ))}
    </div>
  )
}
