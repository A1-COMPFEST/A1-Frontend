import { Button } from "@/components/ui/button";
import Gambar from "../../public/gambar.png";
import Gambar2 from "../../public/section3.png";
import Image from "next/image";

async function getPopularData() {
  const response = await fetch("http://localhost:8000/api/courses/popular", {
    cache: "no-cache",
  });
  const data = await response.json();
  return data.courses;
}

export default async function Home() {
  const popularCourses = await getPopularData();

  return (
    <main className="">
      <section className="text-center pt-44 md:px-0 px-5">
        <h2 className="text-3xl font-semibold">
          Empower Your Learning Journey with Seatudy
        </h2>
        <h4 className="text-lg mt-3">
          Acquire new skills and achieve your professional goals
        </h4>
        <Button className="mt-8">Explore Courses</Button>
      </section>
      <section className="max-w-screen-lg mx-auto text-center py-44 md:px-0 px-5">
        <h2 className="text-3xl font-semibold">Most Popular Course</h2>
        <h4 className="text-lg mt-3">
          Explore our most popular courses to develop your skills and advance
          your career.
        </h4>
        <div className="md:flex justify-center gap-5 mt-5">
          {popularCourses?.map((course: any) => (
            <div
              key={course.id}
              className="bg-white shadow-md p-4 md:w-1/4 rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={Gambar}
                alt=""
                width={1000}
                height={1000}
                className="md:w-full h-32 object-cover rounded-t-lg"
              />
              <div className="text-left grid mt-2 p-2">
                <h5 className="text-lg font-bold text-gray-800">
                  {course.name}
                </h5>
                <p className="text-muted-foreground text-sm py-1">
                  {course.instructor.name}
                </p>
                <p className="font-semibold pb-2">4.0</p>
                <p className="font-semibold">
                  {course.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-secondary py-12 shadow-md">
        <div className="container mx-auto px-4 py-12">
          <div>
            <div className="flex flex-col md:flex-row items-start justify-start">
              <div className="w-full md:w-1/2 p-6">
                <div className="bg-gray-100 rounded-lg p-4">
                  <Image src={Gambar2} alt="" />
                </div>
              </div>

              <div className="w-1/2 pt-8 mt-4 ">
                <h2 className="text-4xl font-bold mb-8">
                  Share Your Passion, Teach the World
                </h2>
                <p className="text-xl w-3/4 pb-8">
                  Turn your expertise into engaging courses and inspire learners
                  globally. Join Udemy as an instructor and start teaching what
                  you love today!
                </p>
                <Button className="">Start Today</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            How learners like you are achieving their goals
          </h2>
        </div>
      </section>
    </main>
  );
}
