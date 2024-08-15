export const dynamic = "force-dynamic";
import SigninForm from "@/components/auth/signin-form";
import PaginatedCourseList from "@/components/student/dashboard/course-pagination";
import TopupDialog from "@/components/student/dashboard/topup-dialog";
import { Button } from "@/components/ui/button";
import {
  getUserId,
  getUserRole,
  getUserToken,
  isLoggedIn,
  signOut,
} from "../../actions/auth/auth-actions";
import { redirect } from "next/navigation";
import axios from "axios";
import { headers } from "next/headers";
import { topUp } from "../../actions/student/student-actions";
import { revalidatePath } from "next/cache";

interface DashboardProps {
  searchParams?: {
    page?: string;
  };
}

async function getCourse(
  userId: number,
  token: any,
  searchParams?: { page?: string }
) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/enrolled/${userId}`
  );

  if (searchParams) {
    if (searchParams.page) {
      url.searchParams.append("page", searchParams.page.toString());
    }
  }

  const response = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data);
  return response.data;
}

async function getBalance(userId: number, token: any) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/balance/${userId}`
  );

  const response = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data);
  return response.data;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const isSigned = await isLoggedIn();
  if (!isSigned) {
    redirect("/auth/sign-in");
  }
  const userId = await getUserId();
  const token = await getUserToken();
  const userRole = await getUserRole();

  if (userRole === "instructor") {
    redirect("/instructor/dashboard");
  }


  const courseData = await getCourse(userId, token, searchParams);
  const balanceData = await getBalance(userId, token);
  const course = courseData;
  const balance = balanceData;
  console.log(courseData.courses.length);


  return (
    <div className="w-full mt-4 px-4">
      <div className="max-w-4xl mx-auto pb-8">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Account balance:</div>
            <div className="text-lg text-primary font-medium pl-4">
              {balance.balance.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </div>
          </div>
          <TopupDialog token={token} userId={userId} />
        </div>
      </div>
      <PaginatedCourseList
        courses={course.courses}
        last_page={course.last_page}
        current_page={course.current_page}
      />
    </div>
  );
}
