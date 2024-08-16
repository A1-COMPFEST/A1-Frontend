import Image from "next/image";
import Link from "next/link";
import AddCourseDialog from "@/components/instructor/add-course-dialog";
import { getUserId, getUserRole } from "@/app/actions/auth/auth-actions";
import axios from "axios";
import EditCourseDialog from "@/components/instructor/edit-course-dialog";
import DeleteCourseDialog from "@/components/instructor/delete-course-dialog";
import { redirect } from "next/navigation";

async function getInstructorCourse(userId : string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/instructor/${userId}`,
    {
        cache: "no-cache",
    }
  );
  const data = await response.json();
  return data.courses;
}

export default async function InstructorPage() {

  const userRole = await getUserRole();
  const userId = await getUserId();
  if (userRole !== "instructor") {
    redirect("/dashboard");
  }

  const instructorCourses = await getInstructorCourse(userId);
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
            <div className="rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300" key={course.id}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                    href={`/instructor/dashboard/course/${course.id}`}
                    passHref
                    className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-4/5"
                >
                  <div className="w-full sm:w-1/5">
                    <Image
                        src={course.image}
                        alt="Course Image"
                        width={150}
                        height={100}
                        className="object-cover w-full h-auto"
                    />
                  </div>
                  <div className="w-full sm:w-4/5">
                    <h3 className="text-[#094C62] text-md font-semibold mb-2">
                      {course.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{course.brief}</p>
                  </div>
                </Link>
                <div className="w-full sm:w-1/5 flex justify-center sm:justify-end space-x-4 mt-4 sm:mt-0">
                  <EditCourseDialog userId={instructorId} courseId={course.id} courseName={course.name} categories={uniqueCategoryData}/>
                    <DeleteCourseDialog userId={instructorId} courseName={course.name} courseId={course.id}/>
                </div>
              </div>
            </div>
        ))}
      </div>
  );
}
