import axios from 'axios';

export async function updateGrade(formData: FormData, assignmentId: string, answerId: string) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/assignments/${assignmentId}/answers/${answerId}`,
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
        console.error("Error updating grade:", error);
        throw new Error("Failed to update grade");
    }
}