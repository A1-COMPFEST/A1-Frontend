import { PurchasedCourse } from "@/app/types";
import CourseCard from "../../course-card";
import PaginationClient from "../../pagination-client";

interface PaginatedCourseListProps {
  courses: PurchasedCourse[];
  last_page: number;
  current_page: number;
}
export default function PaginatedCourseList({
  courses,
  last_page,
  current_page,
}: PaginatedCourseListProps) {
  return (
    <div className="max-w-screen-lg mx-auto text-center md:px-0 px-5">
      <h2 className="text-xl font-semibold mb-4">Purchased Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            instructor_name={course.instructor_name}
            price={course.price}
            image={course.image}
            average_rating={Number(course.average_rating)}
          />
        ))}
      </div>
      <PaginationClient last_page={last_page} current_page={current_page} />
    </div>
  );
}
