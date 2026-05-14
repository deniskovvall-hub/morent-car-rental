import carsData from "@/data/cars.json";
import type { Car, CarType } from "@/types";

const cars: Car[] = carsData as Car[];

export function getAllCars(): Car[] {
  return cars;
}

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id);
}

export interface FilterOptions {
  types?: CarType[];
  maxPrice?: number;
  capacity?: number;
}

export function filterCars(opts: FilterOptions): Car[] {
  return cars.filter((c) => {
    if (opts.types && opts.types.length > 0 && !opts.types.includes(c.type)) {
      return false;
    }
    if (typeof opts.maxPrice === "number" && c.price > opts.maxPrice) {
      return false;
    }
    if (typeof opts.capacity === "number" && c.capacity < opts.capacity) {
      return false;
    }
    return true;
  });
}
