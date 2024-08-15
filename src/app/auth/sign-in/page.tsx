import { getUserToken } from "@/app/actions/auth/auth-actions";
import SigninForm from "@/components/auth/signin-form";
import { redirect } from "next/navigation";

export default async  function SignInPage() {
  const token = await getUserToken();
  if(token) {
    redirect("/");
  }

  return (
    <div className="flex flex-col  items-center min-h-screen justify-center">
      <SigninForm />
    </div>
  );
}
