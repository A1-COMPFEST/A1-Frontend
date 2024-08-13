"use server";

import { cookies } from "next/headers";
import axios from "axios";
import exp from "constants";
import { redirect } from "next/navigation";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

// sleep is used for testing
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export async function signIn(email : string, password : string){
  try{
    
    await sleep(1000);
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password
    });
    
    const data = response.data;
    const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);


    cookies().set("token", data.token, 
      {
        secure: true,
        httpOnly: true, 
        expires: expires
      });

    cookies().set("user", JSON.stringify(data.user), {
      secure: true,
      httpOnly: true, 
      expires: expires
    });
    

    return { success: true };
  
  } catch (error : any) {
    console.error('Login error:', error);
    return { success: false, error: error.response?.data?.message || 'An error occurred' };
  }
}


export async function signUp(name : string, email : string, password : string, role : string){
  try{
    await sleep(1000);
    const response = await axios.post(`${baseUrl}/register/${role}`, {
      name,
      email,
      password
    });
    
    return { success: true };
  } catch (error : any) {
    console.error('Signup error:', error);
    return { success: false, error: error.response?.data?.message || 'An error occurred' };
  }
}

export async function signOut() {
  cookies().delete("token");
  cookies().delete("user");
  redirect("/");
} 
export async function getUserRole() {
  const userCookie = cookies().get("user");
  
  if (!userCookie) {
    return null;
  }

  const user = JSON.parse(userCookie.value);
  
  return user.role;

}

export async function getUserId() {
  const userCookie = cookies().get("user");
  
  if (!userCookie) {
    return null;
  }

  const user = JSON.parse(userCookie.value);
  
  return user.id;
}

export async function getUserToken() {
  const tokenCookie = cookies().get("token");
  if (!tokenCookie) {
    return null;
  }
  
  
  return tokenCookie.value;
}

export async function isLoggedIn() {
  const token = await getUserToken();
  return !!token;
}