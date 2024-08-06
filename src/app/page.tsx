import SigninForm from "@/components/signin-form";
import SignupForm from "@/components/signup-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div>
        <SigninForm />
        <SignupForm />
      </div>
    </main>
  );
}
