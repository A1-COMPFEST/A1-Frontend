import axios from "axios";

export async function addMaterial(formData: FormData, courseId: string) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/contents`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error adding new material:", error);
        throw error;
    }
}

export async function editMaterial(formData: FormData, courseId: string, materialId: string) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/contents/${materialId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error editing material:", error);
        throw new Error("Failed to edit material");
    }
}

export async function deleteMaterial(courseId: string, materialId: string) {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/contents/${materialId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting material:", error);
        throw new Error("Failed to delete material");
    }
}