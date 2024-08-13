import {notFound, useParams} from 'next/navigation';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { lato } from "@/components/ui/font";
import { ChevronDown, ChevronUp } from 'lucide-react';

type CourseDetailPageProps = {
    params : {
        id: string;
    }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps ) {
    const { id } = params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
        cache: 'no-cache',
    });

    if (!response.ok) {
        notFound();
    }

    const data = await response.json();

    console.log(data);

    const course = data.courses;

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className={`text-3xl ${lato.className} font-bold mb-4 text-start text-[#094C62]`}>{course.name}</h1>
            <p className="text-gray-400 text-lg mb-2 text-start">{course.level}</p>
            <p className="text-black text-xl font-semibold mb-4 text-start">Rp {course.price}</p>
            <p className="text-justify mb-6">{course.description}</p>

            {/*<div className="mb-6">*/}
            {/*    <div className="flex justify-start space-x-4 border-b">*/}
            {/*        {['Assignments', 'Materials', 'List of Students', 'Submissions'].map((tab) => (*/}
            {/*            <button*/}
            {/*                key={tab}*/}
            {/*                className={`pb-2 ${activeTab === tab.toLowerCase() ? 'border-b-2 border-[#094C62] text-[#094C62]' : ''}`}*/}
            {/*                onClick={() => setActiveTab(tab.toLowerCase())}*/}
            {/*            >*/}
            {/*                {tab}*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*{activeTab === 'assignments' && (*/}
            {/*    <div>*/}
            {/*        <Button className="bg-[#094C62] text-white hover:bg-[#083a4a] mb-4">Add Assignment</Button>*/}
            {/*        <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center">*/}
            {/*            <div className="hidden sm:block mr-4">*/}
            {/*                <Image src="/assets/instructor/icon-assignment.png" alt="Assignment Icon" width={50} height={50}/>*/}
            {/*            </div>*/}
            {/*            <div className="flex-grow mb-4 md:mr-0.5 sm:mb-0">*/}
            {/*                <h3 className={`${lato.className} text-[#094C62] font-semibold`}>Course Final Project*/}
            {/*                    Assignment</h3>*/}
            {/*                <p className="text-sm">As you approach the end of this course, it&apos;s time to put*/}
            {/*                    everything you&apos;ve learned into practice</p>*/}
            {/*            </div>*/}
            {/*            <div className="flex flex-col sm:flex-row w-full sm:w-auto">*/}
            {/*                <Button variant="outline"*/}
            {/*                        className="mb-2 sm:mb-0 sm:mr-2 border-[#094C62] text-[#094C62]">Edit</Button>*/}
            {/*                <Button variant="destructive">Delete</Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center">*/}
            {/*            <div className="hidden sm:block mr-4">*/}
            {/*                <Image src="/icon-assignment.png" alt="Assignment Icon" width={50} height={50}/>*/}
            {/*            </div>*/}
            {/*            <div className="flex-grow mb-4 md:mr-10 sm:mb-0">*/}
            {/*                <h3 className={`${lato.className} text-[#094C62] font-semibold`}>Midterm Assignment</h3>*/}
            {/*                <p className="text-sm">As you approach the half of this course, it&apos;s time to put*/}
            {/*                    everything you&apos;ve learned into practice Test your knowledge As you approach the*/}
            {/*                    half of this course, it&apos;s time to put everything you&apos;ve learned into practice*/}
            {/*                    Test your knowledge</p>*/}
            {/*            </div>*/}
            {/*            <div className="flex flex-col sm:flex-row w-full sm:w-auto">*/}
            {/*                <Button variant="outline"*/}
            {/*                        className="mb-2 sm:mb-0 sm:mr-2 border-[#094C62] text-[#094C62]">Edit</Button>*/}
            {/*                <Button variant="destructive">Delete</Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{activeTab === 'materials' && (*/}
            {/*    <div>*/}
            {/*        <Button className="bg-[#094C62] text-white hover:bg-[#083a4a] mb-4">Add Material</Button>*/}
            {/*        <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center">*/}
            {/*            <p className="flex-grow mb-4 sm:mb-0">1. Program Hello World</p>*/}
            {/*            <div className="flex flex-col sm:flex-row w-full sm:w-auto">*/}
            {/*                <Button variant="outline"*/}
            {/*                        className="mb-2 sm:mb-0 sm:mr-2 border-[#094C62] text-[#094C62]">Edit</Button>*/}
            {/*                <Button variant="destructive">Delete</Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{activeTab === 'list of students' && (*/}
            {/*    <div>*/}
            {/*        <p>1. Danil F.</p>*/}
            {/*        <p>2. Lotar K.</p>*/}
            {/*        <p>4. Xavier R.</p>*/}
            {/*        <p>5. Danil F.</p>*/}
            {/*        <p>6. Lotar K.</p>*/}
            {/*        <p>7. Xavier R.</p>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{activeTab === 'submissions' && (*/}
            {/*    <div>*/}
            {/*        {submissions.map((assignment) => (*/}
            {/*            <div key={assignment.id} className="mb-4">*/}
            {/*                <div*/}
            {/*                    className="bg-white rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center cursor-pointer"*/}
            {/*                    onClick={() => setOpenAssignment(openAssignment === assignment.id ? null : assignment.id)}*/}
            {/*                >*/}
            {/*                    <div className="hidden sm:block mr-4">*/}
            {/*                        <Image src="/icon-assignment.png" alt="Assignment Icon" width={50} height={50} />*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-grow mb-4 sm:mb-0">*/}
            {/*                        <h3 className={`${lato.className} text-[#094C62] font-semibold`}>{assignment.name}</h3>*/}
            {/*                        <p className="text-sm">{assignment.description}</p>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        {openAssignment === assignment.id ? <ChevronUp /> : <ChevronDown />}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                {openAssignment === assignment.id && (*/}
            {/*                    <div className="mt-2 pl-4">*/}
            {/*                        {assignment.students.map((student) => (*/}
            {/*                            <div key={student.id} className="flex justify-between items-center py-2 border-b">*/}
            {/*                                <span>{student.name}</span>*/}
            {/*                                <Button*/}
            {/*                                    variant="outline"*/}
            {/*                                    className="border-[#094C62] text-[#094C62]"*/}
            {/*                                    onClick={() => /!* Implement check functionality *!/}*/}
            {/*                                >*/}
            {/*                                    Check*/}
            {/*                                </Button>*/}
            {/*                            </div>*/}
            {/*                        ))}*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}