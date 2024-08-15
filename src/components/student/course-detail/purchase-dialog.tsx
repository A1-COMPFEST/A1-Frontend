"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { purchaseCourse, topUp } from "@/app/actions/student/student-actions";
import { useRouter } from "next/navigation";

interface BuyCourseDialogProps {
  courseId: number;
  title: string;
  price: number;
  userId?: number | null;
  token?: string | null;
}

export default function BuyCourseDialog({
  courseId,
  title,
  price,
  userId,
  token,
}: BuyCourseDialogProps) {
  const router = useRouter();
  const handleSubmit = async () => {
    if (!userId || !token) {
      toast.error("Please login first");
      router.push("/auth/sign-in");
      return;
    }
    try {
      const response = await purchaseCourse(userId, token, courseId);
      console.log(response);
      toast.success("Purchase successful");
      router.refresh();
    } catch (error : any) {
      toast.error(error.message);
      console.log("Error during purchase:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-1/4 px-6 py-3 mt-auto text-xl">Buy Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-bold text-2xl text-center">
            Summary
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">Order Details</h2>
          <div className="flex justify-between mb-16">
            {" "}
            {/* Added margin-bottom */}
            <div>
              <p className="text-gray-700">{title}</p>
            </div>
            <div>
              <p className="text-gray-700">
                {price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <p className=" font-bold">Total:</p>
            <p className="font-bold">
              {price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Button onClick={handleSubmit}>Complete Checkout</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
