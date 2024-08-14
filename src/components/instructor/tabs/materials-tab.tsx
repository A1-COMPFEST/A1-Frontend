import { Material} from "@/app/types";

type MaterialsTabProps = {
    materials: Material[];
};

export default function MaterialsTab({ materials }: MaterialsTabProps) {
    return (
        <div>
            {materials.map((material) => (
                <div key={material.id} className="bg-white rounded-lg p-4 mb-4">
                    <p>{material.title}</p>
                </div>
            ))}
        </div>
    );
}