import { cookies } from "next/headers";

export async function GET(){
  if (cookies().get("user")) {
    cookies().delete("user");
    return Response.json({ "success": "User logged out" }, { status: 200 });
  }
  else {
    return Response.json({ "error": "User not logged in" }, { status: 400 });
  }
}
