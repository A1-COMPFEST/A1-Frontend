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

async function fetchCourseData(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        notFound();
    }

    return response.json();
}

async function fetchTabData(courseId: string, tab: string) {
    const endpoint = {
        assignments: `/courses/${courseId}/assignments`,
        materials: `/courses/${courseId}/contents`,
        'list-of-students': `/enrollment/${courseId}`,
        submissions: `/courses/${courseId}/submissions`,
    }[tab] || '/courses/${courseId}/assignments';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${tab} data`);
    }

    return response.json();
}

export default async function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
    const { id } = params;
    const activeTab = searchParams.tab || 'assignments';

    const courseData = await fetchCourseData(id);
    const course = courseData.courses;

    const tabData = await fetchTabData(id, activeTab);

    const tabs = [
        { id: 'assignments', label: 'Assignments' },
        { id: 'materials', label: 'Materials' },
        { id: 'list-of-students', label: 'List of Students' },
        { id: 'submissions', label: 'Submissions' }
    ];

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className={`text-3xl ${lato.className} font-bold mb-4 text-start text-[#094C62]`}>{course.name}</h1>
            <p className="text-gray-400 text-lg mb-2 text-start">{course.level}</p>
            <p className="text-black text-xl font-semibold mb-4 text-start">Rp {course.price}</p>
            <p className="text-justify mb-6">{course.description}</p>

            <div className="mb-6">
                <div className="flex justify-start space-x-4 border-b">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.id}
                            href={`/courses/${id}?tab=${tab.id}`}
                            className={`pb-2 ${activeTab === tab.id ? 'border-b-2 border-[#094C62] text-[#094C62]' : ''}`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>
            </div>

            {activeTab === 'assignments' && <AssignmentsTab assignments={tabData} />}
            {activeTab === 'materials' && <MaterialsTab materials={tabData} />}
            {activeTab === 'list-of-students' && <StudentsTab students={tabData} />}
            {activeTab === 'submissions' && <SubmissionsTab submissions={tabData} />}
        </div>
    );
}