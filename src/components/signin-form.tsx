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

export default function SigninForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center pb-2">Sign In</CardTitle>
        <CardDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-semibold">
            sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-primary font-semibold">
                Email
              </Label>
              <Input id="email" placeholder="Enter your email" />
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
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  );
}
