import { NextResponse } from "next/server";
import { getCarById } from "@/lib/cars";

export function GET(_req: Request, { params }: { params: { id: string } }) {
  const car = getCarById(params.id);
  if (!car) {
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }
  return NextResponse.json({ car });
}
