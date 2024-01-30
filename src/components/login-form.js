"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const invalidEmailAlert = () => toast.error('Invalid Email', { autoClose: 5000 });
  const invalidPasswordAlert = () => toast.error('Invalid Password');
  const router = useRouter();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const isValidPassword = (password) => {
    return password.length >= 8;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    if (!isValidEmail(email.value)) {
      invalidEmailAlert();
      return;
    }
    if (!isValidPassword(password.value)) {
      invalidPasswordAlert();
      return;
    }
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    if (response.status === 200) {
      router.replace("/");
    }
    else {
      toast.error('Invalid Email or Password');
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
      <button>Register</button>
      <button>Forgot Password</button>
    </div>
  );
};
