import { notFound } from 'next/navigation';
import Link from "next/link";
import { lato } from "@/components/ui/font";
import AssignmentsTab from "@/components/instructor/tabs/assignments-tab";
import MaterialsTab from "@/components/instructor/tabs/materials-tab";
import StudentsTab from "@/components/instructor/tabs/students-tab";
import SubmissionsTab from "@/components/instructor/tabs/submissions-tab";

type CourseDetailPageProps = {
    params: { id: string };
    searchParams: { tab?: string };
}

async function getCourseData(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        notFound();
    }
    return response.json();
}

async function getAssignments(id: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}/assignments`,
        {
            cache: 'no-cache',
        }
    );
    return await response.json();
}

async function getMaterials(id: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}/contents`
    );
    return await response.json();
}

async function getStudents(id: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/enrollment/${id}`
    );
    return await response.json();
}


export default async function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
    const { id } = params;

    // DETAIL COURSE
    const courseData = await getCourseData(id);
    const course = courseData.courses;

    // GET ASSIGNMENT
    const courseAssignment = await getAssignments(id);
    const assignments = courseAssignment.assignments;
    console.log(assignments);


    // MATERIAL
    const courseMaterials = await getMaterials(id);
    const materials = courseMaterials.contents;

    // STUDENTS
    const courseStudents = await getStudents(id);
    // console.log(courseStudents);
    const students = courseStudents.users;




    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className={`text-3xl ${lato.className} font-bold mb-4 text-start text-[#094C62]`}>{course.name}</h1>
            <p className="text-gray-400 text-lg mb-2 text-start">{course.level}</p>
            <p className="text-black text-xl font-semibold mb-4 text-start">Rp {course.price}</p>
            <p className="text-justify mb-6">{course.description}</p>

            <h1 className={`font-bold`}>Daftar kursus</h1>
            {materials?.map((material: any) => (
                <div key={material.id}>
                    <p>{material.title}</p>
                    <p>{material.description}</p>
                </div>
            ))}

            <h1 className={`font-bold mt-2`}>Daftar assignments</h1>
            {assignments?.map((assignment: any) => (
                <div key={assignment}>
                    <p>{assignment.title}</p>
                    {assignment.id}
                    <p>{assignment.description}</p>
                </div>
            ))}

            <h1 className={`font-bold mt-2`}>Daftar Siswa</h1>
            {students?.map((student: any) => (
                <div key={student}>
                    <p>{student.name}</p>
                </div>
            ))}

        </div>
    );
}