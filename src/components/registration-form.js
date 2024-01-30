"use client"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export const RegistrationForm = () => {
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
    const body = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirm_password: event.target.confirm_password.value,
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    router.redirect("/")
  }
  return (
    <div>
       <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">First Name</label>
      <input type="text" id="first_name" name="first_name" placeholder="First Name..." required />
      <label htmlFor="last_name">Last Name</label>
      <input type="text" id="last_name" name="last_name" placeholder="Last Name..." required />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" placeholder="Email..." required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
      <label htmlFor="confirm_password">Confirm Password</label>
      <input type="password" id="confirm_password" name="confirm_password" required />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};
