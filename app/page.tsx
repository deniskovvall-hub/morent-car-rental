import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Booking } from "@/components/Booking";
import { CarList } from "@/components/CarList";
import { getAllCars } from "@/lib/cars";

export default function HomePage() {
  const all = getAllCars();
  const popular = all.slice(0, 4);
  const recommend = all.slice(4, 12);

  return (
    <>
      <Hero />
      <Booking />

      <section className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 mt-12 lg:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm lg:text-base font-semibold text-ink-300">Popular Car</h2>
          <Link href="/cars" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <CarList cars={popular} />
      </section>

      <section className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 mt-12 lg:mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm lg:text-base font-semibold text-ink-300">Recomendation Car</h2>
        </div>
        <CarList cars={recommend} />
      </section>

      <section className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 mt-10 lg:mt-12 mb-4 flex items-center justify-between gap-4">
        <div className="flex-1" />
        <Link
          href="/cars"
          className="px-6 py-3 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
        >
          Show more car
        </Link>
        <p className="flex-1 text-right text-sm font-semibold text-ink-300">
          {all.length * 10} Car
        </p>
      </section>
    </>
  );
}
