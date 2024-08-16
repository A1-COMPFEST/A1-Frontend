import axios from "axios";

export async function addCourse(
    formData: FormData
) {

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',

                },
            }
        );
        return response.data.message;
    } catch (error : any) {
        console.error("Error during adding new course::", error);
        console.log();
        throw error;
    }
}

export async function updateCourse(
    formData: FormData,
    courseId: number
) {

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',

                },
            }
        );
        return response.data.message;
    } catch (error : any) {
        console.error("Error during adding new course::", error);
        console.log();
        throw error;
    }
}

export async function deleteCourse (
    courseId: number
) {

    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        )
        return response.data;
    } catch (error : any) {
        console.error("Error during deleting course::", error)
        console.log();
        throw error;
    }
}