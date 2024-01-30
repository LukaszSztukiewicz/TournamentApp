import { LoginForm } from "@/components/login-form";
import { cookies } from "next/headers";

export default function LoginPage() {
  // see if user is logged in
  const cookieMessage = cookies().get("user")
  if (cookieMessage) {
    return (
      <>
        <p>You are already logged in.</p>
      </>
    );
  }
  return (
    <>
      <LoginForm />
    </>
  );
}
