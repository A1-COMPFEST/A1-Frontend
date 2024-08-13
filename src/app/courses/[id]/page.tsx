import Image from "next/image";
import { Button } from "@/components/ui/button";
import BuyCourseDialog from "@/components/course-detail/purchase-dialog";
import { getUserId, getUserToken } from "@/app/actions/auth-actions";

async function getCourseData(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  
  return data.courses;
}

export default async function Page({ params }: { params: { id: number } }) {
  const course = await getCourseData(params.id);
  const userId = await getUserId();
  const userToken = await getUserToken();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-5xl mx-auto shadow-md rounded-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 p-6">
            <div className="mb-4">
              <Image src="/gambar.png" alt="" width={1600} height={900} />
            </div>
            <h1 className="text-2xl text-primary font-bold mb-2">
              {course.name}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Temporary Instructor
            </p>
            <p className="text-sm mb-4">{course.syllabus}</p>
            <div className="flex items-center mb-4 gap-2">
              <span className="font-semibold">4.0</span>
              <span className="text-yellow-400">★★★★</span>
            </div>
            <span className="text-2xl font-bold">
              {course.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
          </div>
          <div className="md:w-3/5 p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-8">{course.description}</p>

            <BuyCourseDialog
              title={course.name}
              courseId={params.id}
              price={course.price}
              userId={userId}
              token={userToken}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
