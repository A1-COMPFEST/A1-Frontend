import { Assignment} from "@/app/types";

type AssignmentsTabProps = {
    assignments: Assignment[];
};

export default function AssignmentsTab({ assignments }: AssignmentsTabProps) {
    return (
        <div>
            {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white rounded-lg p-4 mb-4">
                    <h3 className="text-[#094C62] font-semibold">{assignment.title}</h3>
                    <p>{assignment.description}</p>
                </div>
            ))}
        </div>
    );
}