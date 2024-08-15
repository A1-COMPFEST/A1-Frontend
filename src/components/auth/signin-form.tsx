"use client";
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
import { FormEvent } from "react";
import { signIn } from "@/app/actions/auth/auth-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SigninForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(email, password);
    const result = await signIn(email, password);
    setLoading(false);

    if (result.success) {
      toast.success("Signed in successfully!");
      router.push("/");
    } else {
      toast.error(result.error || "An error occurred");
      console.log(result.error);
    }
  };
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-center pb-2">Sign In</CardTitle>
        <CardDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="text-primary font-semibold">
            sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-primary font-semibold">
                Email
              </Label>
              <Input name="email" placeholder="Enter your email" type="email"/>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-primary font-semibold">
                Password
              </Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-cente pt-8 ">
          <Button type="submit" className="w-full" disabled={loading}>
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
