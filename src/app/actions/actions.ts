"use server";
import axios from "axios";
import { headers } from "next/headers";


export async function topUp(userId: any, token: string, amount: number) {
  console.log(userId);
  console.log(token);
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

export async function addCourse(
    userId: any,
    courseName: string,
    courseCategory: string,
    level:string,
    brief: string,
    desc: string,
    cover: File,
    price: number,
    ) {

  const formData = new FormData();

  formData.append('userId', userId.toString());
  formData.append('courseName', courseName);
  formData.append('courseCategory', courseCategory);
  formData.append('level', level);
  formData.append('brief', brief);
  formData.append('description', desc);
  formData.append('cover', cover);
  formData.append('price', price.toString());

  try {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`,
        {
          formData
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: `Bearer ${token}`,
          },
        }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during adding new course::", error);
    throw error;
  }
}

