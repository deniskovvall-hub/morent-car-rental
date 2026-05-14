"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarkIcon, SwapIcon } from "./icons";

interface BookingState {
  location: string;
  date: string;
  time: string;
}

const LOCATIONS = ["New York", "Los Angeles", "Chicago"];

export function Booking() {
  const router = useRouter();
  const [pick, setPick] = useState<BookingState>({ location: "", date: "", time: "" });
  const [drop, setDrop] = useState<BookingState>({ location: "", date: "", time: "" });

  function swap() {
    const tmp = pick;
    setPick(drop);
    setDrop(tmp);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/cars");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 mt-6 lg:mt-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        <BookingPanel label="Pick - Up" state={pick} onChange={setPick} />
        <BookingPanel label="Drop - Off" state={drop} onChange={setDrop} />

        <button
          type="button"
          onClick={swap}
          aria-label="Swap pick-up and drop-off"
          className="hidden md:grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-xl bg-primary text-white place-items-center shadow-lg hover:bg-primary/90 transition"
        >
          <SwapIcon width={22} height={22} />
        </button>
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <button
          type="button"
          onClick={swap}
          aria-label="Swap pick-up and drop-off"
          className="w-14 h-14 rounded-xl bg-primary text-white grid place-items-center shadow-lg"
        >
          <SwapIcon width={22} height={22} />
        </button>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 rounded-md bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition"
        >
          Search cars
        </button>
      </div>
    </form>
  );
}

function BookingPanel({
  label,
  state,
  onChange,
}: {
  label: string;
  state: BookingState;
  onChange: (next: BookingState) => void;
}) {
  return (
    <div className="bg-white rounded-xl p-5 lg:p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <MarkIcon width={16} height={16} className="text-primary" />
        <p className="font-semibold text-ink-900 text-sm">{label}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2">
        <Field label="Locations">
          <select
            className="bg-transparent text-sm text-ink-500 focus:outline-none w-full"
            value={state.location}
            onChange={(e) => onChange({ ...state, location: e.target.value })}
          >
            <option value="">Select your city</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </Field>
        <Divider />
        <Field label="Date">
          <input
            type="date"
            className="bg-transparent text-sm text-ink-500 focus:outline-none w-full"
            value={state.date}
            onChange={(e) => onChange({ ...state, date: e.target.value })}
          />
        </Field>
        <Divider />
        <Field label="Time">
          <input
            type="time"
            className="bg-transparent text-sm text-ink-500 focus:outline-none w-full"
            value={state.time}
            onChange={(e) => onChange({ ...state, time: e.target.value })}
          />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-ink-900">{label}</span>
      {children}
    </label>
  );
}

function Divider() {
  return <span aria-hidden className="hidden sm:block w-px self-stretch bg-ink-100" />;
}
