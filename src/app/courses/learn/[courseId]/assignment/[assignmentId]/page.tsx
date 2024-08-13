import { getUserId, getUserToken } from "@/app/actions/auth-actions";
import { BookText } from "lucide-react";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubmitBox from "../../../../../../components/assignment/submit-box";
import axios from "axios";




async function getAnwerStatusAndGrade(userId: string, userToken: string, params: { courseId: string; assignmentId: string; }) {
  try{
    const answer = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/assignments/${params.assignmentId}/answers/${userId}`,
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
  return ([answer.data.answer.status, answer.data.answer.grade]);
  }catch(error){
    console.error("Error during purchase:", error);
    return [];
  }
}



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
  
  const deadline = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/assignments/deadline/${params.assignmentId}/${userId}`,
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
  const deadlineData = deadline.data.deadline;
  console.log(deadlineData);

  const assignment = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/assignments/${params.assignmentId}`,
    { headers: { Authorization: `Bearer ${userToken}` } }
  );

  

  const assignmentData = assignment.data.assignment;

  const [answerStatus, grade] = await getAnwerStatusAndGrade(userId, userToken, params);
  console.log(answerStatus);
  console.log(grade);



  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-12 ">
        <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-md lg:min-w-[500px]">
          <div className="flex items-center mb-4">
            <div className="border-2 border-primary text-primary p-2 rounded-full mr-3">
              <BookText size={24} />
            </div>
            <h2 className="text-xl text-primary font-bold ">
              {assignmentData.title}
            </h2>
          </div>
          <p className="text-muted-foreground pb-6">Instructor</p>
          <p className="text-gray-600 mb-4">{assignmentData.description}</p>

          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-red-700">Deadline</h4>
              <span className="text-sm text-gray-500">{deadlineData}</span>
            </div>
          </div>

          {/* Embed PDF */}
          <div className="mt-6">
            <iframe
              src="/assets/pdfs/p.pdf"
              width="100%"
              height="500px"
              className="border-2 border-gray-300 rounded"
              title="Assignment PDF"
            ></iframe>
          </div>
        </div>
        <div className="items-start p-6 border-2 shadow-md min-w-60">
          <SubmitBox userId={userId} assignmentId={params.assignmentId} token={userToken} answerStatus={answerStatus} grade={grade}/>
        </div>
      </div>
    </div>
  );
}
