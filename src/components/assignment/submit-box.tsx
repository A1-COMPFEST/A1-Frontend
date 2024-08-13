"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState, useRef } from "react";
import { Input } from "../ui/input";
import { addAnswer } from "@/app/actions/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SubmitBoxProps {
  userId: string;
  answerStatus: string;
  assignmentId: string;
  token: string;
  grade: string;
}

export default function SubmitBox({
  userId,
  answerStatus,
  assignmentId,
  token,
  grade,
}: SubmitBoxProps) {

  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    formData.append("user_id", userId);
    try {
      const response = await addAnswer(formData, token, assignmentId);
      toast.success("Answer submitted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error during submitting answer:", error);
    }
  };

  return (
    <form
      action={async (formData) => {
        await handleSubmit(formData);
      }}
      className="flex flex-col justify-between gap-4"
    >
      <div className="flex flex-row justify-between">
        <div className="text-primary font-semibold">Assignment</div>
        <div className="text-muted-foreground text-md">{grade === undefined || null ? "" : grade}</div>
        <div className="text-muted-foreground text-md">{answerStatus === undefined||null ? "not submitted" : answerStatus}</div>
      </div>
      <Input type="file" name="task"></Input>
      <Button type="submit">Submit</Button>
    </form>
  );
}
