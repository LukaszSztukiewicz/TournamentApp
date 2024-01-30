import "@picocss/pico";

import { Inter } from "next/font/google";
import ToastProvider from "@providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tournament App",
  description: "Lukasz Sztukiewicz's Tournament App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "20px" }}>
              <a href="/">Home</a>
            </div>

            {children}
          </nav>
        </ToastProvider>
      </body>
    </html>
  );
}
