import { getUserId, getUserToken } from "@/app/actions/auth-actions";
import { BookText } from "lucide-react";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubmitBox from "@/components/assignment/submit-box";

export default async function AssignmentPage({
  params,
}: {
  params: {
    courseId: string;
    assignmentId: string;
  };
}) {
  const userId = await getUserId();
  const userToken = await getUserToken();
  if (!userToken) {
    redirect("/signin");
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12 mt-[8vh]">
        <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="border-2 border-primary text-primary p-2 rounded-full mr-3">
              <BookText size={24} />
            </div>
            <h2 className="text-xl text-primary font-bold ">
              Course Final Project Assignment
            </h2>
          </div>
          <p className="text-muted-foreground pb-6">Rayhan Fadhlan</p>
          <p className="text-gray-600 mb-4">
            As you approach the end of this course, it's time to put everything
            you've learned into practice. The Final Project is your opportunity
            to showcase the skills and knowledge you've gained, applying them to
            a real-world challenge.
          </p>

          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-gray-700">Assignment</h4>
              <span className="text-sm text-gray-500">Started</span>
            </div>
          </div>
        </div>
        <div className="items-start p-6 border-2 shadow-md min-w-60">
          <SubmitBox /> 
          {/* <div className="flex flex-col justify-between gap-4 ">
            <div className="flex flex-row justify-between">
              <div className="text-primary font-semibold">Assignment</div>
              <div className="text-muted-foreground text-md">Started</div>
            </div>
            <Button variant={"outline"}>Add a Task</Button>
            <Button>Submit</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
