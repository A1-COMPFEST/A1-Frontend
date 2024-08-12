"use client";

import { signUpUser } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await signUpUser(name, email, password);
    setLoading(false);

    if (result.success) {
      toast.success("Signed up successfully!");
      router.push("/signin");
    } else {
      toast.error(result.error || "An error occurred");
      console.log(result.error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center pb-2">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary font-semibold">
            sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-primary font-semibold">
                Full Name
              </Label>
              <Input name="name" type="text" placeholder="Name" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-primary font-semibold">
                Email
              </Label>
              <Input name="email" placeholder="Enter your email" type="email" required />
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone" className="text-primary font-semibold">
                Phone
              </Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-primary font-semibold">
                Password
              </Label>
              <Input
                name="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-cente pt-8 ">
          <Button type="submit" className="w-full" disabled={loading}>
            Create Account
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
