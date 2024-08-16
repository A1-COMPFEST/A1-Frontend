import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

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
  const roundedRating = Math.round(parseFloat(rating));

  
  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) return title;
    return title.substr(0, maxLength) + '...';
  };

  return (
    <Link
      href={`/courses/${id}`}
      className="bg-white border p-4 transform transition duration-500 hover:bg-secondary w-full max-w-2xl flex flex-col sm:flex-row gap-4 sm:gap-8"
    >
      <div key={id} className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full">
        <Image
          src={image}
          alt={name}
          width={300}
          height={170}
          className="w-full sm:w-56 h-32 object-cover rounded-lg sm:rounded-l-lg"
        />
        <div className="text-left grid pb-4 flex-grow relative">
          <h3 className="text-xl font-bold text-gray-800 truncate text-primary pr-24">
            {truncateTitle(name, 50)}
          </h3>
          <p className="text-muted-foreground text-sm pb-1">
            {instructor_name}
          </p>
          <p className="text-xs py-1 overflow-hidden max-h-36">{syllabus}</p>
          <div className="flex items-center font-semibold text-sm pb-1">
            {rating} <span className="mr-1"></span>
            {Array.from({ length: roundedRating }, (_, index) => (
              <FaStar key={index} className="text-yellow-500 mr-1" />
            ))}
          </div>
          <div className="absolute top-0 right-0 text-right">
            <p className="font-semibold text-sm">
              {price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p className="font text-muted-foreground text-xs mt-1">
              {level}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}