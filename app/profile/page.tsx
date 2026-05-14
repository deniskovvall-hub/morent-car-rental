"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 lg:py-16">
        <div className="bg-white rounded-xl p-8 shadow-card text-center text-ink-500">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 lg:py-16">
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-card text-center">
          <h1 className="text-xl font-bold text-ink-900 mb-2">Please log in</h1>
          <p className="text-sm text-ink-500 mb-6">
            You need to sign in to view your profile.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/login"
              className="bg-primary text-white text-sm font-semibold py-3 rounded-md hover:bg-primary/90 transition"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold text-ink-700 border border-ink-100 py-3 rounded-md hover:bg-canvas"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 lg:py-16">
      <div className="bg-white rounded-xl p-6 lg:p-8 shadow-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary text-white grid place-items-center text-xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-ink-900">{user.name}</h1>
            <p className="text-sm text-ink-500">{user.email}</p>
          </div>
        </div>
        <dl className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between border-b border-ink-100/60 pb-2">
            <dt className="text-ink-300">User ID</dt>
            <dd className="text-ink-700 font-mono text-xs">{user.id}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={logout}
          className="w-full text-sm font-semibold border border-ink-100 py-3 rounded-md hover:bg-canvas"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
