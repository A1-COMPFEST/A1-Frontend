import { Button } from '@/components/ui/button';
import Gambar from '../../public/gambar.png';
import Gambar2 from '../../public/section3.png';
import Image from 'next/image';

async function getPopularData() {
  const response = await fetch('http://localhost:8000/api/courses/popular', {
    cache: 'no-cache',
  });
  const data = await response.json();
  return data.courses;
}

export default async function Home() {
  const popularCourses = await getPopularData();

  return (
    <main className="">
      <section className="text-center pt-44 md:px-0 px-5">
        <h2 className="text-3xl font-semibold">Empower Your Learning Journey with Seatudy</h2>
        <h4 className="text-lg mt-3">Acquire new skills and achieve your professional goals</h4>
        <Button className="mt-8">Explore Courses</Button>
      </section>
      <section className="max-w-screen-lg mx-auto text-center py-44 md:px-0 px-5">
        <h2 className="text-3xl font-semibold">Most Popular Course</h2>
        <h4 className="text-lg mt-3">Explore our most popular courses to develop your skills and advance your career.</h4>
        <div className="md:flex justify-center gap-5 mt-5">
          {popularCourses?.map((course: any) => (
            <div key={course.id} className="bg-white shadow-xl p-2 md:w-1/4">
              <Image src={Gambar} alt="" width={1000} height={1000} className="md:w-full h-32" />
              <div className="text-left grid mt-2">
                <h5 className="text-base font-bold">{course.name}</h5>
                <p className="text-sm">{course.instructor.name}</p>
                <p className="text-sm mt-1">4.0</p>
                <p className="text-sm mt-2">{course.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="">
        <div className="max-w-screen-lg mx-auto bg-blue-500">
          <Image src={Gambar2} alt="" width={1000} height={1000} className="w-1/4" />
        </div>
      </section>
    </main>
  );
}
