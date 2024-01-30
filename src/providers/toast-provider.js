// https://github.com/fkhadra/react-toastify/issues/963
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
