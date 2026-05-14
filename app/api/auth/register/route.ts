import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { createUser, findUserByEmail } from "@/lib/users";

interface Body {
  name?: string;
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
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email and password are required" },
      { status: 400 },
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 },
    );
  }
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  }
  const user = await createUser(name, email, password);
  const token = signToken({ sub: user.id, email: user.email });
  return NextResponse.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
