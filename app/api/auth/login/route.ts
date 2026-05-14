import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { findUserByEmail, verifyPassword } from "@/lib/users";

interface Body {
  email?: string;
  password?: string;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }
  const user = findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
  const ok = await verifyPassword(user, password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
  const token = signToken({ sub: user.id, email: user.email });
  return NextResponse.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
