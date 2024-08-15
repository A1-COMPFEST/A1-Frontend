"use client";
import Image from "next/image";
import Link from "next/link";

import React from "react";

import { Button } from "./ui/button";
import { getUserToken, signOut } from "@/app/actions/auth/auth-actions";
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
    <header className="top-0 flex h-16 items-center gap-4 bg-background px-2 sm:px-4 md:px-6 lg:px-12 lg:py-10 xl:px-20">
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
          <Link href="/auth/sign-in">
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
