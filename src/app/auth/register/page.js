import Link from "next/link";
import { RegistrationForm } from "@components/registration-form";

export default function RegisterPage() {
  return (
    <>
      <RegistrationForm />
      <Link href={`/`}> Go Back </Link>
    </>
  );
};
