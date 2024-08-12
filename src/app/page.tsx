import { Button } from "@/components/ui/button";
import Image from "next/image";
import CourseCard from "@/components/course-card";
import Link from "next/link";

async function getPopularData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/popular`,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();
  return data.courses;
}

export default async function Home() {
  const popularCourses = await getPopularData();

  return (
    <main className="">
      <section id ="hero" className="text-center h-screen flex flex-col justify-center items-center md:px-0 px-5">
        <h2 className="text-3xl font-semibold">
          Empower Your Learning Journey with Seatudy
        </h2>
        <h4 className="text-lg mt-3">
          Acquire new skills and achieve your professional goals
        </h4>
        <Link href="/explore">
          <Button className="mt-8">Explore Courses</Button>
        </Link>
      </section>
      <section className="max-w-screen-lg mx-auto text-center py-44 md:px-0 px-5">
        <h2 className="text-3xl font-semibold">Most Popular Course</h2>
        <h4 className="text-lg mt-3">
          Explore our most popular courses to develop your skills and advance
          your career.
        </h4>
        <div className="md:flex justify-center gap-5 mt-5">
          {popularCourses?.map((course: any) => (
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              instructor_name={course.instructor_name}
              price={course.price}
              image={course.image}
              average_rating={course.average_rating}
            />
          ))}
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4 py-12">
          <div>
            <div className="flex flex-col md:flex-row items-start justify-start">
              <div className="w-full md:w-1/2 p-6">
                <div className="rounded-lg p-4">
                  <Image src={'/assets/landing-page/section-3.svg'} width={`600`} height={`600`} alt="" className="mx-auto md:mx-0"/>
                </div>
              </div>
              <div className="w-full md:w-1/2 pt-8 mt-4 text-center md:text-left">
                <h2 className="text-4xl font-bold mb-8">
                  Share Your Passion, knjnTeach the World
                </h2>
                <p className="text-xl md:w-3/4 pb-8 mx-auto md:mx-0">
                  Turn your expertise into engaging courses and inspire learners
                  globally. Join Udemy as an instructor and start teaching what
                  you love today!
                </p>
                <Button className="mx-auto md:mx-0">Start Today</Button>
              </div>
            </div>
          </div>
        </div>
        </section>
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              How learners like you are achieving their goals
            </h2>
          </div>
        </section>
      </main>
  );
}
