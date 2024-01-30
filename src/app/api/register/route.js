import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@prismaDir/queries";
import { fakeUserComplete } from "@prismaDir/_auto_data-generators";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request){
  // Check if the user is already logged in
  if (request.session && request.session.get("user")) {
    return Response.json({ "error": "User already logged in" }, { status: 400 });
  }

  // Extract data from the POST request
  const { 
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = await request.json();

  // Check if the email already exists
  const user = await getUserByEmail(email);
  if (user) {
    return Response.json({ "error": "Email already exists" }, { status: 400 });
  }
  else if (password !== confirmPassword) {
    return Response.json({ "error": "Passwords do not match" }, { status: 400 });
  }
  else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const templateUser = fakeUserComplete();
    templateUser.firstName = firstName;
    templateUser.lastName = lastName;
    templateUser.email = email;
    templateUser.password = hashedPassword;
    await createUser(templateUser);
    // cookies().set("user", templateUser);
    return Response.json({ "success": "User created" }, { status: 200 });
  }
}
