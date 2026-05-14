import Image from "next/image";
import { notFound } from "next/navigation";
import { GasIcon, TransmissionIcon, UsersIcon } from "@/components/icons";
import { getCarById } from "@/lib/cars";

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = getCarById(params.id);
  if (!car) notFound();

  const gallery = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="relative bg-gradient-to-br from-[#54A6FF] to-[#3563E9] rounded-xl aspect-[4/3] overflow-hidden">
            <Image
              src={gallery[0]}
              alt={car.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            {gallery.slice(0, 3).map((src, i) => (
              <div
                key={i}
                className="relative bg-white rounded-xl aspect-[4/3] overflow-hidden border border-ink-100/60"
              >
                <Image
                  src={src}
                  alt={`${car.name} thumbnail ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 33vw, 16vw"
                  className="object-contain p-3"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-card flex flex-col">
          <div className="mb-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-ink-900">{car.name}</h1>
            <p className="text-sm font-semibold text-ink-300 mt-1">{car.type}</p>
          </div>
          <p className="text-ink-500 text-sm lg:text-base leading-relaxed mb-6">
            {car.description}
          </p>

          <dl className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
            <SpecRow label="Type Car" value={car.type} />
            <SpecRow label="Capacity" value={`${car.capacity} Person`} icon={<UsersIcon width={18} height={18} />} />
            <SpecRow label="Steering" value={car.transmission} icon={<TransmissionIcon width={18} height={18} />} />
            <SpecRow label="Gasoline" value={car.fuel} icon={<GasIcon width={18} height={18} />} />
          </dl>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6 border-t border-ink-100">
            <div>
              <p className="text-2xl font-bold text-ink-900">
                ${car.price.toFixed(2)}/<span className="text-ink-300 text-sm">day</span>
              </p>
              {typeof car.oldPrice === "number" && (
                <p className="text-sm text-ink-300 line-through mt-1">
                  ${car.oldPrice.toFixed(2)}
                </p>
              )}
            </div>
            <button
              type="button"
              className="bg-primary text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-primary/90 transition"
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm text-ink-300">{label}</dt>
      <dd className="flex items-center gap-2 text-sm font-semibold text-ink-700">
        {icon && <span className="text-ink-300">{icon}</span>}
        {value}
      </dd>
    </div>
  );
}
