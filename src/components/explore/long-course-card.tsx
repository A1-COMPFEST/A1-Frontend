import Image from "next/image";
import { FaStar } from "react-icons/fa";
interface LongCourseCardProps {
  id: number;
  name: string;
  instructor_name: string;
  price: number;
  image: string;
  syllabus: string;
  rating: string;
  level: string;
}

export default function LongCourseCard({
  id,
  name,
  instructor_name,
  price,
  image,
  level,
  syllabus,
  rating,
}: LongCourseCardProps) {
  console.log(rating);
  const roundedRating = Math.round(parseFloat(rating));
  return (
    <div
      key={id}
      className="bg-white border p-4 transform transition duration-500 hover:bg-secondary  w-full max-w-2xl flex gap-8"
    >
      <Image
        src="/gambar.png"
        alt={name}
        width={300}
        height={170}
        className="w-56 h-32 object-cover rounded-l-lg"
      />
      <div className="text-left grid pb-4 flex-grow relative">
        <h3 className="text-xl font-bold text-gray-800 truncate text-primary">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm pb-1">{instructor_name}</p>
        <p className="text-xs py-1 overflow-hidden max-h-36">{syllabus}</p>
        <div className="flex items-center font-semibold text-sm pb-1">
          {rating} <span className="mr-1"></span>
          {Array.from({ length: roundedRating }, (_, index) => (
            <FaStar key={index} className="text-yellow-500 mr-1" />
          ))}
        </div>
        <p className="font-semibold text-sm absolute top-0 right-0">
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        <p className="font text-muted-foreground text-xs absolute top-6 right-0">{level}</p>
      </div>
    </div>
  );
}
