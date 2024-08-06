import * as React from "react";

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

export default function SignupForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center pb-2">Sign Up</CardTitle>
        <CardDescription className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            sign in
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="text-primary font-semibold">
                Full Name
              </Label>
              <Input id="name" placeholder="Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-primary font-semibold">
                Email
              </Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone" className="text-primary font-semibold">
                Phone
              </Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-primary font-semibold">
                Password
              </Label>
              <Input id="password" placeholder="Enter your password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-cente pt-8 ">
        <Button className="w-full">Create Account</Button>
      </CardFooter>
    </Card>
  );
}
