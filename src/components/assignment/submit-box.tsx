"use client";

import { Button } from "@/components/ui/button";
import { FormEvent, useState, useRef } from "react";


interface SubmitBoxProps {
  userId: number;
  token : any;
}


export default function SubmitBox() {
  const [file, setFile] = useState<File | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      console.log("File submitted:", file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between gap-4"
    >
      <div className="flex flex-row justify-between">
        <div className="text-primary font-semibold">Assignment</div>
        <div className="text-muted-foreground text-md">Started</div>
      </div>
      <>
        <Button variant={"outline"} type="button" onClick={handleUpload}>
          Add a Task
        </Button>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={hiddenFileInput}
        />
      </>
      <Button type="submit">Submit</Button>
    </form>
  );
}
