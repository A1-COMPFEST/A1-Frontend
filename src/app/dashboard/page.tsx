import SigninForm from "@/components/auth/signin-form";
import PaginatedCourseList from "@/components/dashboard/course-pagination";
import TopupDialog from "@/components/dashboard/topup-dialog";
import { Button } from "@/components/ui/button";
import {
  getUserId,
  getUserRole,
  getUserToken,
  isLoggedIn,
  signOut,
} from "../actions/auth-actions";
import { redirect } from "next/navigation";
import axios from "axios";
import { headers } from "next/headers";

interface DashboardProps {
  searchParams?: {
    page?: string;
  };
}

export default async function Dashboard({ searchParams }: DashboardProps) {

  const isSigned = await isLoggedIn();
  if (!isSigned) {
    redirect("/signin");
  }
  const userId = await getUserId();
  const token = await getUserToken();

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/enrolled/${userId}`
  );

  if (searchParams) {
    if (searchParams.page) {
      url.searchParams.append("page", searchParams.page.toString());
    }
  }
  console.log(url.toString());
  const response = await axios.get(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data;
  console.log(data);
  const balance = (100000).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="w-full mt-4 px-4">
      <div className="max-w-4xl mx-auto pb-8">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <div className="text-lg font-semibold">Account balance:</div>
            <div className="text-lg text-primary font-medium pl-4">
              {balance}
            </div>
          </div>
          <TopupDialog />
        </div>
      </div>
      <PaginatedCourseList
        courses={data.courses}
        last_page={data.last_page}
        current_page={data.current_page}
        total_courses={data.total}
      />
    </div>
  );
}
