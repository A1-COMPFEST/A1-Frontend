import { getUserToken } from "@/app/actions/auth/auth-actions";
import SignupForm from "@/components/auth/signup-form";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const token = await getUserToken();
  if(token) {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <SignupForm />
    </div>
  );
}
