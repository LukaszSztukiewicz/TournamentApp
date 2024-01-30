import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { ToastCookieMessage } from "@components/toast-cookie-message";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to the Tournament App</h1>
      <ToastCookieMessage message="This website uses cookies to enhance the user experience." />
      <p>
        <Link href="/tournament">View Tournaments</Link>
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link href="/auth/login" style={{ padding: "20px" }}>
          <button>Login</button>
        </Link>
        <Link href="/auth/register" style={{ padding: "20px" }}>
          <button>Register</button>
        </Link>
      </div>
    </main>
  );
}
