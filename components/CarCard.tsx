"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Car } from "@/types";
import { GasIcon, HeartIcon, TransmissionIcon, UsersIcon } from "./icons";

export function CarCard({ car }: { car: Car }) {
  const [liked, setLiked] = useState<boolean>(Boolean(car.liked));

  return (
    <article className="bg-white rounded-xl p-5 lg:p-6 shadow-card flex flex-col h-full">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <h3 className="text-lg font-bold text-ink-900">{car.name}</h3>
          <p className="text-sm font-bold text-ink-300 mt-1">{car.type}</p>
        </div>
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={liked}
          className={`shrink-0 transition ${liked ? "text-like" : "text-ink-300 hover:text-like"}`}
        >
          <HeartIcon width={22} height={22} filled={liked} />
        </button>
      </div>

      <div className="relative w-full aspect-[3/2] my-4">
        <Image
          src={car.image}
          alt={`${car.name} ${car.type.toLowerCase()} car`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain"
        />
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm text-ink-300 mb-5">
        <Spec icon={<GasIcon width={18} height={18} />} text={car.fuel} />
        <Spec icon={<TransmissionIcon width={18} height={18} />} text={car.transmission} />
        <Spec icon={<UsersIcon width={18} height={18} />} text={`${car.capacity} People`} />
      </div>

      <div className="flex items-end justify-between mt-auto gap-3">
        <div>
          <p className="font-bold text-ink-900 text-base lg:text-lg">
            ${car.price.toFixed(2)}/<span className="text-ink-300 text-xs">day</span>
          </p>
          {typeof car.oldPrice === "number" && (
            <p className="text-xs text-ink-300 line-through mt-0.5">
              ${car.oldPrice.toFixed(2)}
            </p>
          )}
        </div>
        <Link
          href={`/cars/${car.id}`}
          className="bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-primary/90 transition"
        >
          Rent Now
        </Link>
      </div>
    </article>
  );
}

function Spec({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-ink-300 shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
