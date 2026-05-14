export function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 pt-6 lg:pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HeroCard
          title="The Best Platform for Car Rental"
          text="Ease of doing a car rental safely and reliably. Of course at a low price."
          variant="light"
        />
        <HeroCard
          title="Easy way to rent a car at a low price"
          text="Providing cheap car rental services and safe and comfortable facilities."
          variant="dark"
        />
      </div>
    </section>
  );
}

interface HeroCardProps {
  title: string;
  text: string;
  variant: "light" | "dark";
}

function HeroCard({ title, text, variant }: HeroCardProps) {
  const isLight = variant === "light";
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-6 sm:p-8 lg:p-10 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] flex flex-col justify-between text-white ${
        isLight
          ? "bg-gradient-to-br from-[#54A6FF] to-[#3563E9]"
          : "bg-gradient-to-br from-[#3563E9] to-[#1A2F6B]"
      }`}
    >
      <div className="max-w-[300px] relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold leading-tight mb-4">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">{text}</p>
      </div>
      <button
        type="button"
        className={`self-start relative z-10 px-5 py-2.5 rounded-md text-sm font-semibold transition ${
          isLight
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-primary hover:bg-primary/80 text-white shadow-md"
        }`}
      >
        Rental Car
      </button>
      <div
        aria-hidden
        className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/5 blur-3xl"
      />
    </div>
  );
}
