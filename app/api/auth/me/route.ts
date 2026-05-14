import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export function GET(req: Request) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user });
}
