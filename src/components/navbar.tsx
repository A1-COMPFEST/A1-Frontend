"use client";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import React from "react";

import { Button } from "./ui/button";
import { getUserToken, signOut } from "@/app/actions/auth-actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar({ isSignedIn }: { isSignedIn: boolean }) {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
    toast.success("Signed out successfully!");
  };
  console.log(isSignedIn);

  return (
    <header className="top-0 flex h-16 items-center gap-4 border-b bg-background px-8 md:px-16">
      <Link href="/" className="flex-col items-center gap-2 overflow-hidden">
        <div className="flex items-end gap-2">
          <Image
            src="/seatudy-logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="align-bottom"
          />
          <Image
            src="/seatudy-text.svg"
            alt="Logo"
            width={100}
            height={32}
            className="align-bottom"
          />
        </div>
      </Link>
      <div className="ml-auto flex space-x-4">
        {!isSignedIn ? (
          <Link href="/signin">
            <Button className="" variant={"outline"}>
              Sign In
            </Button>
          </Link>
        ) : (
          <Button variant={"outline"} onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
        <Link href="/dashboard">
          <Button className="w-32">Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
