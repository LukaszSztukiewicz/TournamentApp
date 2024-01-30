"use client"
import { toast } from "react-toastify"

export const ToastCookieMessage = (message) => {
  toast.info(message);

  return null;
}
