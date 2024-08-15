"use server";
import axios from "axios";


export async function topUp(userId: any, token: string, amount: number) {

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/topup/${userId}`,
      {
        balance: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during topUp:", error);
    throw error;
  }
}



export async function purchaseCourse(
  userId: any,
  token: string,
  courseId: number
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/enrollment/${courseId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    return response.data;
  } catch (error : any) {
    
    console.error("Error during purchase:", error);
    throw error;
  }
}


export async function addReview(
  userId: any,
  token: string,
  courseId: number,
  rating: number,
  comment: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}/ratings/${userId}`,
      {
        rating : rating,
        comments : comment
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error during addReview:", error.response.data);
    } else if (error.request) {
      console.error("Error during addReview: No response received", error.request);
    } else {
      console.error("Error during addReview:", error.message);
    }
    throw error;
  }
}

export async function addAnswer (formData : FormData, token: string, assignmentId: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/assignments/${assignmentId}/answers`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during addAnswer:", error);
    throw error;
  }
}