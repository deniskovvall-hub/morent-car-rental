"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import type { CarType } from "@/types";

const CAR_TYPES: CarType[] = ["Sport", "Sedan", "SUV", "Hatchback", "Coupe"];
const CAPACITY_OPTIONS = [2, 4, 6, 8];
const PRICE_MAX = 200;

export function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const initialTypes = (params.get("type") || "")
    .split(",")
    .filter(Boolean) as CarType[];
  const initialPrice = Number(params.get("maxPrice") || PRICE_MAX);
  const initialCapacity = params.get("capacity") ? Number(params.get("capacity")) : null;

  const [types, setTypes] = useState<CarType[]>(initialTypes);
  const [maxPrice, setMaxPrice] = useState<number>(
    Number.isFinite(initialPrice) ? initialPrice : PRICE_MAX,
  );
  const [capacity, setCapacity] = useState<number | null>(initialCapacity);
  const [open, setOpen] = useState<boolean>(false);

  const apply = useCallback(
    (nextTypes: CarType[], nextPrice: number, nextCapacity: number | null) => {
      const sp = new URLSearchParams();
      if (nextTypes.length) sp.set("type", nextTypes.join(","));
      if (nextPrice < PRICE_MAX) sp.set("maxPrice", String(nextPrice));
      if (nextCapacity) sp.set("capacity", String(nextCapacity));
      router.push(`/cars${sp.toString() ? "?" + sp.toString() : ""}`);
    },
    [router],
  );

  function toggleType(t: CarType) {
    const next = types.includes(t) ? types.filter((x) => x !== t) : [...types, t];
    setTypes(next);
    apply(next, maxPrice, capacity);
  }

  function setCapacityValue(v: number) {
    const next = capacity === v ? null : v;
    setCapacity(next);
    apply(types, maxPrice, next);
  }

  function onPriceChange(v: number) {
    setMaxPrice(v);
  }

  function onPriceCommit() {
    apply(types, maxPrice, capacity);
  }

  function reset() {
    setTypes([]);
    setMaxPrice(PRICE_MAX);
    setCapacity(null);
    router.push("/cars");
  }

  const body = (
    <div className="space-y-8">
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-300 mb-4">
          Type
        </h4>
        <ul className="space-y-3">
          {CAR_TYPES.map((t) => (
            <li key={t}>
              <label className="flex items-center gap-3 cursor-pointer text-sm text-ink-700">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={types.includes(t)}
                  onChange={() => toggleType(t)}
                />
                {t}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-300 mb-4">
          Capacity
        </h4>
        <ul className="space-y-3">
          {CAPACITY_OPTIONS.map((c) => (
            <li key={c}>
              <label className="flex items-center gap-3 cursor-pointer text-sm text-ink-700">
                <input
                  type="radio"
                  name="capacity"
                  className="w-4 h-4 accent-primary"
                  checked={capacity === c}
                  onChange={() => setCapacityValue(c)}
                />
                {c} {c >= 8 ? "or more People" : "People"}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-300 mb-4">
          Price
        </h4>
        <input
          type="range"
          min={20}
          max={PRICE_MAX}
          step={1}
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          onMouseUp={onPriceCommit}
          onTouchEnd={onPriceCommit}
          onKeyUp={onPriceCommit}
          className="w-full accent-primary"
        />
        <p className="mt-2 text-sm font-semibold text-ink-900">
          Max. ${maxPrice}.00
        </p>
      </section>

      <button
        type="button"
        onClick={reset}
        className="w-full text-sm font-semibold text-ink-500 border border-ink-100 rounded-md px-4 py-2.5 hover:bg-canvas"
      >
        Reset filters
      </button>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden w-full mb-4 px-4 py-2.5 rounded-md bg-white border border-ink-100 text-sm font-semibold text-ink-700"
      >
        {open ? "Hide filters" : "Show filters"}
      </button>
      <aside
        className={`bg-white rounded-xl p-6 ${open ? "block" : "hidden"} lg:block`}
      >
        {body}
      </aside>
    </>
  );
}
