"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 lg:py-16">
      <div className="bg-white rounded-xl p-6 lg:p-8 shadow-card">
        <h1 className="text-2xl font-bold text-ink-900 mb-2">Welcome back</h1>
        <p className="text-sm text-ink-500 mb-6">Log in to your Morent account.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField id="email" label="Email">
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-ink-100 px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </FormField>
          <FormField id="password" label="Password">
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-ink-100 px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </FormField>

          {error && (
            <p className="text-sm text-like" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold text-sm py-3 rounded-md hover:bg-primary/90 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-ink-500 mt-6 text-center">
          No account yet?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

function FormField({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink-700">
        {label}
      </label>
      {children}
    </div>
  );
}
