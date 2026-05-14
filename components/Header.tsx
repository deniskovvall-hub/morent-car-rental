"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { BellIcon, CloseIcon, FilterIcon, HeartIcon, MenuIcon, SearchIcon, SettingsIcon } from "./icons";

export function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-ink-100/60">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 py-4 lg:py-6 flex items-center gap-4 lg:gap-12">
        <Link href="/" className="text-2xl lg:text-3xl font-bold text-primary tracking-tight shrink-0">
          MORENT
        </Link>

        <div className="hidden md:flex flex-1 max-w-[492px] items-center gap-3 rounded-full border border-ink-100 px-4 py-2.5">
          <SearchIcon width={20} height={20} className="text-ink-300 shrink-0" />
          <input
            type="text"
            placeholder="Search something here"
            className="flex-1 bg-transparent text-sm text-ink-700 placeholder:text-ink-300 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Filters"
            className="text-ink-300 hover:text-ink-700"
          >
            <FilterIcon width={20} height={20} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <IconButton label="Favorites">
            <HeartIcon width={20} height={20} />
          </IconButton>
          <IconButton label="Notifications">
            <BellIcon width={20} height={20} />
          </IconButton>
          <IconButton label="Settings">
            <SettingsIcon width={20} height={20} />
          </IconButton>
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center font-semibold text-sm hover:bg-primary/90 transition"
                aria-label="Profile"
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <button
                onClick={logout}
                className="text-sm text-ink-500 hover:text-ink-900 px-2"
                type="button"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-ink-700 px-3 py-2 hover:text-primary"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="md:hidden ml-auto text-ink-700"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon width={28} height={28} />
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white p-6 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">MORENT</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" type="button">
                <CloseIcon width={24} height={24} />
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-ink-100 px-4 py-2.5">
              <SearchIcon width={20} height={20} className="text-ink-300" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <nav className="flex flex-col gap-3 text-base">
              <Link href="/" className="text-ink-700 hover:text-primary" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/cars" className="text-ink-700 hover:text-primary" onClick={() => setOpen(false)}>
                Cars
              </Link>
              <Link href="/profile" className="text-ink-700 hover:text-primary" onClick={() => setOpen(false)}>
                Profile
              </Link>
            </nav>
            <div className="mt-auto flex flex-col gap-2">
              {user ? (
                <>
                  <p className="text-sm text-ink-500">Signed in as <span className="text-ink-900 font-semibold">{user.name}</span></p>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    type="button"
                    className="w-full text-sm font-semibold border border-ink-100 px-4 py-2.5 rounded-md hover:bg-canvas"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full text-center text-sm font-semibold border border-ink-100 px-4 py-2.5 rounded-md hover:bg-canvas"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="w-full text-center text-sm font-semibold text-white bg-primary px-4 py-2.5 rounded-md hover:bg-primary/90"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="w-10 h-10 grid place-items-center rounded-full border border-ink-100 text-ink-500 hover:text-primary hover:border-primary transition"
    >
      {children}
    </button>
  );
}
