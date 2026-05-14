import { CarList } from "@/components/CarList";
import { Filters } from "@/components/Filters";
import { filterCars } from "@/lib/cars";
import type { CarType } from "@/types";

interface PageProps {
  searchParams: { type?: string; maxPrice?: string; capacity?: string };
}

const ALLOWED_TYPES: CarType[] = ["Sport", "Sedan", "SUV", "Hatchback", "Coupe"];

export default function CarsPage({ searchParams }: PageProps) {
  const types = (searchParams.type || "")
    .split(",")
    .filter(Boolean)
    .filter((t): t is CarType => (ALLOWED_TYPES as string[]).includes(t));

  const maxPriceNum = Number(searchParams.maxPrice);
  const capacityNum = Number(searchParams.capacity);

  const cars = filterCars({
    types: types.length ? types : undefined,
    maxPrice: Number.isFinite(maxPriceNum) && maxPriceNum > 0 ? maxPriceNum : undefined,
    capacity: Number.isFinite(capacityNum) && capacityNum > 0 ? capacityNum : undefined,
  });

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 py-8 lg:py-12">
      <h1 className="text-2xl lg:text-3xl font-bold text-ink-900 mb-6 lg:mb-8">
        Browse Cars
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        <Filters />
        <div>
          <p className="text-sm text-ink-500 mb-4">
            Showing <span className="font-semibold text-ink-900">{cars.length}</span> car{cars.length === 1 ? "" : "s"}
          </p>
          <CarList cars={cars} />
        </div>
      </div>
    </div>
  );
}
