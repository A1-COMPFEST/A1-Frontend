import { Student} from "@/app/types";

type StudentsTabProps = {
    students: Student[];
};

export default function StudentsTab({ students }: StudentsTabProps) {
    return (
        <div>
            {students.map((student, index) => (
                <p key={student.id}>{`${index + 1}. ${student.name}`}</p>
            ))}
        </div>
    );
}