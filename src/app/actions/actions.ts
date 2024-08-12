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