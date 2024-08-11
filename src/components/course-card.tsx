import Image from "next/image";

interface CourseCardProps {
  id: number;
  name: string;
  instructor_name: string;
  price: number;
  image: string;
  rating: number;
}

export default function CourseCard({
  id,
  name,
  instructor_name,
  price,
  image,
  rating,
}: CourseCardProps) {
  return (
    <div
      key={id}
      className="bg-white shadow-md p-2 transform transition duration-500 hover:bg-secondary hover:shadow-xl w-full max-w-xs"
    >
      <Image
        src="/gambar.png"
        alt={name}
        width={300}
        height={170}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <div className="text-left grid mt-1 p-1">
        <h5 className="text-md font-bold text-gray-800 truncate">{name}</h5>
        <p className="text-muted-foreground text-xs py-1">{instructor_name}</p>
        <p className="font-semibold text-sm pb-1">4.0</p>
        <p className="font-semibold text-sm">
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
      </div>
    </div>
  );
}