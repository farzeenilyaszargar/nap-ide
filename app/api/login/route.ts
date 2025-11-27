import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Replace with DB check
  if (email !== "test@example.com" || password !== "123456") {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return NextResponse.redirect(
    `http://localhost:3000/electron-auth-success?token=${token}`
  );
}
