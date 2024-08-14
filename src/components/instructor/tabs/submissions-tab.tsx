import { Submission} from "@/app/types";

type SubmissionsTabProps = {
    submissions: Submission[];
};

export default function SubmissionsTab({ submissions }: SubmissionsTabProps) {
    return (
        <div>
            {submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg p-4 mb-4">
                    <h3 className="text-[#094C62] font-semibold">{submission.assignmentName}</h3>
                    <p>{submission.studentName}</p>
                </div>
            ))}
        </div>
    );
}