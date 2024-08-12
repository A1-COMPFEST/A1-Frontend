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
interface TopupDialogProps {
  userId: number;
  token: any;
}

export default function TopupDialog({ userId, token }: TopupDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    console.log(userId);
    console.log(token);

    const amount = formData.get("amount") as string;
    try {
      const amountNumber = parseInt(amount);
      const response = await topUp(userId, token, amountNumber);
      setLoading(false);

      console.log(response);
      router.refresh();
      toast.success("Top up successful");
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred");
      console.error("Error during topUp:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Top Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary font-semibold text-xl text-center">
            Top Up Detail
          </DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            await handleSubmit(formData);
            setIsOpen(false);
          }}
        >
          <div className="grid gap-4 py-8">
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="amount" className="text-left">
                Amount
              </Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="amount" className="text-right">
                  Rp
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="100000"
                  className="flex-grow"
                />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              Top Up
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
