"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { addReview } from "@/app/actions/student/student-actions";

interface ReviewFormProps {
  courseId: string;
  userId: number;
  token: any;
}

export default function ReviewForm({
  courseId,
  userId,
  token,
}: ReviewFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    console.log(formData);

    const name = formData.get("name") as string;
    const rating = formData.get("rating") as string;
    const comment = formData.get("comment") as string;

    try {
      const response = await addReview(
        userId,
        token,
        parseInt(courseId),
        parseInt(rating),
        comment
      );
      
      setLoading(false);

      console.log(response);
      toast.success("Review submitted successfully");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred");
      console.error("Error during topUp:", error);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-semibold text-xl text-center">
            Leave a Review!
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="rating">Rating</Label>
              <Select name="rating">
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Leave a comment"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={loading}>
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
