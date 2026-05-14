import jwt from "jsonwebtoken";
import { findUserById } from "./users";
import type { User } from "@/types";

const SECRET = process.env.JWT_SECRET || "morent-dev-secret-fallback";

export interface TokenPayload {
  sub: string;
  email: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded === "object" && decoded && "sub" in decoded && "email" in decoded) {
      return { sub: String(decoded.sub), email: String((decoded as { email: unknown }).email) };
    }
    return null;
  } catch {
    return null;
  }
}

export function getUserFromRequest(req: Request): User | null {
  const header = req.headers.get("authorization");
  if (!header || !header.toLowerCase().startsWith("bearer ")) return null;
  const token = header.slice(7).trim();
  const payload = verifyToken(token);
  if (!payload) return null;
  const u = findUserById(payload.sub);
  if (!u) return null;
  return { id: u.id, email: u.email, name: u.name };
}
