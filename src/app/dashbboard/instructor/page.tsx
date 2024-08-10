import Image from "next/image";
import { Button } from "@/components/ui/button";
import Gambar from "../../../../public/gambar.png";

export default async function InstructorPage() {
    return (
        <div className="my-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-4 sm:mb-0">Manage your Courses</h1>
                <Button className="bg-[#094C62] text-white hover:bg-[#083a4a] w-full sm:w-auto">Add Course</Button>
            </div>
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-full sm:w-1/6">
                            <Image
                                src={Gambar}
                                alt="Course Image"
                                width={150}
                                height={100}
                                className="object-cover w-full h-auto"
                            />
                        </div>
                        <div className="w-full sm:w-3/6">
                            <h3 className="text-[#094C62] text-md font-semibold mb-2">
                                Go: The Complete Developer's Guide (Golang)
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Learn Go ("Golang") from the ground up & in great depth by building multiple demo
                                projects, incl. a REST API
                            </p>
                        </div>
                        <div className="w-full sm:w-2/6 flex justify-center sm:justify-end space-x-4 mt-4 sm:mt-0">
                            <Button
                                variant="outline"
                                className="border-black text-[#094C62] hover:bg-gray-100"
                            >
                                Edit
                            </Button>
                            <Button
                                className="bg-[#FFEDE7] text-[#DF4B4B] hover:bg-[#FFE0D7]"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}