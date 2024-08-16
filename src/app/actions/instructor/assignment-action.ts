import axios from "axios";

export async function addAssignment(formData: FormData, courseId: string) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/assignments`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error adding new assignment:", error);
        throw error;
    }
}

export async function editAssignment(formData: FormData, courseId: string, assignmentId: string) {
    try {
        console.log('Sending data:', Object.fromEntries(formData));
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/assignments/${assignmentId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error editing assignment:", error);
        throw new Error("Failed to edit assignment");
    }
}

export async function deleteAssignment(assignmentId: string) {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/assignments/${assignmentId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting assignment:", error);
        throw new Error("Failed to delete assignment");
    }
}