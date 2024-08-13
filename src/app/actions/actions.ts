"use server";
import axios from "axios";
import { headers } from "next/headers";
import {any} from "prop-types";


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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error during addReview:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error during addReview: No response received", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during addReview:", error.message);
    }
    throw error;
  }
}

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
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/6`,
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

