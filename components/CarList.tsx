import type { Car } from "@/types";
import { CarCard } from "./CarCard";

export function CarList({ cars }: { cars: Car[] }) {
  if (cars.length === 0) {
    return (
      <div className="bg-white rounded-xl p-10 text-center text-ink-500">
        No cars match your filters.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
      {cars.map((car, idx) => (
        <CarCard key={`${car.id}-${idx}`} car={car} />
      ))}
    </div>
  );
}
