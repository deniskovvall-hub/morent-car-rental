import Link from "next/link";

const aboutLinks = ["How it works", "Featured", "Partnership", "Bussiness Relation"];
const communityLinks = ["Events", "Blog", "Podcast", "Invite a friend"];
const socialLinks = ["Discord", "Instagram", "Twitter", "Facebook"];

export function Footer() {
  return (
    <footer className="bg-white border-t border-ink-100/60 mt-16">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold text-primary mb-3">MORENT</h2>
            <p className="text-ink-500 text-sm leading-relaxed">
              Our vision is to provide convenience and help increase your sales business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
            <FooterColumn title="About" items={aboutLinks} />
            <FooterColumn title="Community" items={communityLinks} />
            <FooterColumn title="Socials" items={socialLinks} />
          </div>
        </div>

        <div className="border-t border-ink-100/70 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-ink-700">
          <p className="font-semibold">&copy;2022 MORENT. All rights reserved</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-semibold">
            <Link href="#" className="hover:text-primary">Privacy &amp; Policy</Link>
            <Link href="#" className="hover:text-primary">Terms &amp; Condition</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-ink-900 mb-5">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item}>
            <Link href="#" className="text-ink-500 text-sm hover:text-primary">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
