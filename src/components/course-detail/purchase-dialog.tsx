"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { topUp } from "@/app/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuyCourseDialog() {
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
              <p className="text-gray-700">
                Go: The Complete Developer's Guide (Golang)
              </p>
            </div>
            <div>
              <p className="text-gray-700">Rp199,000</p>
            </div>
          </div>

          <div className="flex justify-between">
            <p className=" font-bold">Total:</p>
            <p className="font-bold">Rp199,000</p>
          </div>
          <div className="flex justify-center mt-8">
            <Button>Complete Checkout</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
