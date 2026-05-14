import { NextResponse } from "next/server";
import { filterCars } from "@/lib/cars";
import type { CarType } from "@/types";

const ALLOWED_TYPES: CarType[] = ["Sport", "Sedan", "SUV", "Hatchback", "Coupe"];

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const typeParam = searchParams.get("type") || "";
  const types = typeParam
    .split(",")
    .filter(Boolean)
    .filter((t): t is CarType => (ALLOWED_TYPES as string[]).includes(t));

  const maxPriceNum = Number(searchParams.get("maxPrice"));
  const capacityNum = Number(searchParams.get("capacity"));

  const cars = filterCars({
    types: types.length ? types : undefined,
    maxPrice: Number.isFinite(maxPriceNum) && maxPriceNum > 0 ? maxPriceNum : undefined,
    capacity: Number.isFinite(capacityNum) && capacityNum > 0 ? capacityNum : undefined,
  });

  return NextResponse.json({ cars });
}
