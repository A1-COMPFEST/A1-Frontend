import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddCourseDialog from "@/components/instructor/add-course-dialog";
import { getUserId } from "@/app/actions/auth-actions";
import axios from "axios";

async function getInstructorCourse() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/instructor/5`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return data.courses;
}

export default async function InstructorPage() {
  const instructorCourses = await getInstructorCourse();
  const instructorId = await getUserId();

  const uniqueCategory = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`
  );
  const uniqueCategoryData = uniqueCategory.data.categories;

  return (
    <div className="my-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Manage your Courses</h1>
        <AddCourseDialog userId={instructorId} categories={uniqueCategoryData}/>
      </div>
      {instructorCourses?.map((course: any) => (
        <Link
          href={`/instructor/dashboard/course/${course.id}`}
          key={course.id}
          passHref
        >
          <div className="bg-white rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-1/6">
                <Image
                  src={course.image}
                  alt="Course Image"
                  width={150}
                  height={100}
                  className="object-cover w-full h-auto"
                />
              </div>
              <div className="w-full sm:w-3/6">
                <h3 className="text-[#094C62] text-md font-semibold mb-2">
                  {course.name}
                </h3>
                <p className="text-gray-600 text-sm">{course.brief}</p>
              </div>
              <div className="w-full sm:w-2/6 flex justify-center sm:justify-end space-x-4 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  className="border-black text-[#094C62] hover:bg-gray-100"
                >
                  Edit
                </Button>
                <Button className="bg-[#FFEDE7] text-[#DF4B4B] hover:bg-[#FFE0D7]">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
