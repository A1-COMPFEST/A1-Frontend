import SigninForm from "@/components/auth/signin-form";
import PaginatedCourseList from "@/components/dashboard/course-pagination";
import TopupDialog from "@/components/dashboard/topup-dialog";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
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
            <div className="text-lg text-primary font-medium pl-4">{balance}</div>
          </div>
          <TopupDialog />
        </div>
      </div>
      <PaginatedCourseList />
    </div>
  );
}
