import { notFound } from 'next/navigation';
import Image from "next/image";
import { lato } from "@/components/ui/font";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddAssignmentDialog from "@/components/instructor/tabs/assignments/add-assignment-dialog";
import EditAssignmentDialog from "@/components/instructor/tabs/assignments/edit-assignment-dialog";
import DelAssignmentDialog from "@/components/instructor/tabs/assignments/del-assignment-dialog";
import AddMaterialDialog from "@/components/instructor/tabs/materials/add-materials-dialog";
import EditMaterialDialog from "@/components/instructor/tabs/materials/edit-materials-dialog";
import DeleteMaterialDialog from "@/components/instructor/tabs/materials/del-materials-dialog";
import AddGradeDialog from "@/components/instructor/tabs/submissions/add-grade-dialog";

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
    const enrollmentData = await response.json();
    const students = enrollmentData.users;

    // Fetch progress for each student
    const studentsWithProgress = await Promise.all(
        students.map(async (student: any) => {
            const progress = await getStudentProgress(id, student.id);
            return {
                ...student,
                progress: progress ? progress.progress.progress_percentage : null
            };
        })
    );

    return studentsWithProgress;
}

async function getSubmissions(id: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}/assignments`
    );
    const assignments = await response.json();

    const submissionsPromises = assignments.assignments.map(async (assignment: any) => {
        const enrollmentResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/enrollment/${id}`
        );
        const enrollmentData = await enrollmentResponse.json();
        const students = enrollmentData.users;

        const submissionsPromises = students.map(async (student: any) => {
            const submissionResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/assignments/${assignment.id}/answers/${student.id}`
            );
            if (submissionResponse.ok) {
                const submissionData = await submissionResponse.json();
                return { ...submissionData.answer, studentName: student.name };
            }
            return null;
        });

        const submissions = await Promise.all(submissionsPromises);
        return { ...assignment, submissions: submissions.filter(Boolean) };
    });

    return Promise.all(submissionsPromises);
}

async function getStudentProgress(courseId: string, userId: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/progress/courses/${courseId}/${userId}`
    );
    if (!response.ok) {
        console.error('Failed to fetch student progress');
        return null;
    }
    return await response.json();
}

const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
};


export default async function CourseDetailPage({ params, searchParams }: CourseDetailPageProps) {
    const { id } = params;

    const courseData = await getCourseData(id);
    const course = courseData.courses;

    const courseAssignment = await getAssignments(id);
    const assignments = courseAssignment.assignments;

    const courseMaterials = await getMaterials(id);
    const materials = courseMaterials.contents;

    const courseStudents = await getStudents(id);
    const students = courseStudents;

    const submissionsData = await getSubmissions(id);

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className={`text-3xl ${lato.className} font-bold mb-4 text-start text-[#094C62]`}>{course.name}</h1>
            <p className="text-gray-400 text-lg mb-2 text-start">{course.level}</p>
            <p className="text-black text-xl font-semibold mb-4 text-start">Rp {course.price}</p>
            <p className="text-justify mb-6">{course.description}</p>

            <Tabs defaultValue="assignments">
                <TabsList className="flex overflow-x-auto">
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="students">List of Students</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>

                <TabsContent value="assignments">
                    <div className="mb-4">
                        <AddAssignmentDialog courseId={id} />
                    </div>
                    <div>
                        {assignments?.map((assignment: any) => (
                            <div key={assignment.id} className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <div className="hidden sm:block sm:flex-shrink-0 sm:w-[40px] sm:h-[40px] mr-4 mb-2 sm:mb-0">
                                    <Image src="/assets/instructor/icon-assignment.png" alt="Assignment Icon" width={40} height={40} />
                                </div>
                                <div className="flex-grow mb-2 sm:mb-0 w-full sm:w-auto">
                                    <h3 className="font-bold">{assignment.title}</h3>
                                    <p className="mb-2 sm:mb-0 whitespace-pre-wrap">{assignment.description}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row w-full gap-2 sm:w-auto">
                                    <EditAssignmentDialog
                                        courseId={id}
                                        assignmentId={assignment.id}
                                        assignmentTitle={assignment.title}
                                        assignmentDescription={assignment.description}
                                        assignmentDueDate={assignment.due_date}
                                    />
                                    <DelAssignmentDialog courseId={id} assignmentId={assignment.id} assignmentTitle={assignment.title}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="materials">
                    <div className="mb-4">
                        <AddMaterialDialog courseId={id} />
                    </div>
                    <div>
                        {materials?.map((material: any) => (
                            <div key={material.id}
                                 className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                                <div className="flex-grow mb-2 sm:mb-0 w-full sm:w-auto">
                                    <h3 className="font-bold">{material.title}</h3>
                                    <p className="mb-2 sm:mb-0 whitespace-pre-wrap">{material.description}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row w-full gap-2 sm:w-auto">
                                    <EditMaterialDialog
                                        courseId={id}
                                        materialId={material.id}
                                        initialData={{
                                            title: material.title,
                                            description: material.description,
                                        }}
                                    />
                                    <DeleteMaterialDialog
                                        courseId={id}
                                        materialId={material.id}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="students">
                    <div>
                        {students?.map((student: any) => (
                            <div key={student.id} className="flex justify-between mb-2">
                                <span>{student.name}</span>
                                <span>Progress: {student.progress !== null ? `${Math.round(student.progress)}%` : '0%'}</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="submissions">
                    <div>
                        {submissionsData.map((assignment: any) => (
                            <details key={assignment.id} className="mb-4">
                                <summary className="cursor-pointer list-none">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="hidden sm:block sm:flex-shrink-0 sm:w-[40px] sm:h-[40px] mr-4 mb-2 sm:mb-0">
                                            <Image src="/assets/instructor/icon-assignment.png" alt="Assignment Icon" width={40} height={40} />
                                        </div>
                                        <div className="flex-grow mb-2 sm:mb-0 w-full sm:w-auto">
                                            <h3 className="font-bold">{assignment.title}</h3>
                                            <p className="mb-2 sm:mb-0 whitespace-pre-wrap">
                                                {assignment.submissions.length > 0 ?
                                                    `Submissions received: ${assignment.submissions.length}` :
                                                    "No submissions received yet"
                                                }
                                            </p>
                                        </div>
                                        {assignment.submissions.length > 0 && (
                                            <div className="ml-2">
                                                <span className="text-sm text-gray-500">▼</span>
                                            </div>
                                        )}
                                    </div>
                                </summary>
                                {assignment.submissions.length > 0 && (
                                    <div className="mt-2 ml-4">
                                        {assignment.submissions.map((submission: any) => (
                                            <div key={submission.id} className="flex justify-between items-center mb-2">
                                                <span className={`text-black`}>{submission.studentName}</span>
                                                <div>
                                                    <span className="mr-2">Status: {submission.status}</span>
                                                    <span className="mr-2">Grade: {submission.grade !== null ? submission.grade : "~"}</span>
                                                    {/*{submission.task && (*/}
                                                    {/*    <button*/}
                                                    {/*        onClick={() => handleDownload(`${process.env.NEXT_PUBLIC_API_BASE_URL}/answers/${submission.assignment_id}/${submission.task}`)}*/}
                                                    {/*        className="mr-2"*/}
                                                    {/*    >*/}
                                                    {/*        <Image*/}
                                                    {/*            src="/assets/instructor/icon-download.png"*/}
                                                    {/*            alt="Download"*/}
                                                    {/*            width={20}*/}
                                                    {/*            height={20}*/}
                                                    {/*        />*/}
                                                    {/*    </button>*/}
                                                    {/*)}*/}
                                                    <AddGradeDialog
                                                        assignmentId={assignment.id}
                                                        answerId={submission.id}
                                                        currentGrade={submission.grade}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </details>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}