import bcrypt from "bcryptjs";

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

const users = new Map<string, StoredUser>();

function makeId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<StoredUser> {
  const key = email.toLowerCase();
  if (users.has(key)) {
    throw new Error("EMAIL_EXISTS");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const u: StoredUser = { id: makeId(), email: key, name, passwordHash };
  users.set(key, u);
  return u;
}

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.get(email.toLowerCase());
}

export function findUserById(id: string): StoredUser | undefined {
  for (const u of users.values()) {
    if (u.id === id) return u;
  }
  return undefined;
}

export async function verifyPassword(
  user: StoredUser,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}
