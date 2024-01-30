import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@prismaDir/queries";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request){ 
  var cookieMessage = "";

  // Check if the user is already logged in
  if (request.session && request.session.get("user")) {
    return Response.json({ "error": "User already logged in" }, { status: 400 });
  }
  if (!request.body) {
    return Response.json({ "error": "Invalid request" }, { status: 400 });
  }
  if (cookies().get("user")) {
    cookies().set("cookieMessage", "User already logged in");
    return Response.json({ "error": "User already logged in" }, { status: 400 });
  }

  // Extract data from the POST request
  const { email, password } = await request.json();

  const user = await getUserByEmail(email);
  if (!user) {
    cookies().set("cookieMessage", "Email does not exist");
    return Response.json({ "error": "Email does not exist" }, { status: 400 });
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    cookies().set("cookieMessage", "Wrong Password");
    return Response.json({ "error": "Wrong Password" }, { status: 400 });
  }
  // await request.session.set("user", user);
  // await request.session.save();
  cookies().set("user", user);
  cookies().set("cookieMessage", "User logged in");
  return Response.json({ "success": "User logged in" }, { status: 200 });
}
