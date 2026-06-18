import { Link } from "react-router-dom";
import PackageCard from "./PackageCard";

export const PACKAGES = [
  {
    id:            "birthday-basic",
    title:         "Birthday Basic",
    price:         "₹5,999",
    emoji:         "🎂",
    badge:         "Best Value",
    badgeFeatured: false,
    featured:      false,
    gradient:      "from-rose-950/70 to-slate-900/80",
    accentFrom:    "#fb7185",
    accentTo:      "#f43f5e",
    borderIdle:    "border-white/8",
    borderHover:   "hover:border-rose-500/45",
    glowColor:     "hover:shadow-rose-500/10",
    services: [
      "Venue for up to 30 guests",
      "Balloon & ribbon decoration",
      "2-hour event slot",
      "Birthday cake setup",
    ],
  },
  {
    id:            "birthday-premium",
    title:         "Birthday Premium",
    price:         "₹13,999",
    emoji:         "🎉",
    badge:         "Most Popular",
    badgeFeatured: true,
    featured:      true,
    gradient:      "from-violet-950/90 to-fuchsia-950/80",
    accentFrom:    "#a78bfa",
    accentTo:      "#ec4899",
    borderIdle:    "border-violet-500/45",
    borderHover:   "hover:border-violet-400/70",
    glowColor:     "hover:shadow-violet-500/20",
    services: [
      "Venue for up to 100 guests",
      "Premium themed decoration",
      "4-hour event slot",
      "Photography & videography",
    ],
  },
  {
    id:            "anniversary-gold",
    title:         "Anniversary Gold",
    price:         "₹17,999",
    emoji:         "💍",
    badge:         "Romantic Pick",
    badgeFeatured: false,
    featured:      false,
    gradient:      "from-amber-950/70 to-slate-900/80",
    accentFrom:    "#fbbf24",
    accentTo:      "#f59e0b",
    borderIdle:    "border-white/8",
    borderHover:   "hover:border-amber-500/45",
    glowColor:     "hover:shadow-amber-500/10",
    services: [
      "Candlelight dinner setup",
      "Live ghazal / acoustic music",
      "Floral & fairy light décor",
      "Couple photo session",
    ],
  },
  {
    id:            "wedding-silver",
    title:         "Wedding Silver",
    price:         "₹34,999",
    emoji:         "👰",
    badge:         null,
    badgeFeatured: false,
    featured:      false,
    gradient:      "from-sky-950/70 to-slate-900/80",
    accentFrom:    "#38bdf8",
    accentTo:      "#818cf8",
    borderIdle:    "border-white/8",
    borderHover:   "hover:border-sky-500/45",
    glowColor:     "hover:shadow-sky-500/10",
    services: [
      "Venue for up to 200 guests",
      "Floral stage & mandap décor",
      "Full-day event coverage",
      "Buffet catering included",
    ],
  },
  {
    id:            "wedding-premium",
    title:         "Wedding Premium",
    price:         "₹74,999",
    emoji:         "💒",
    badge:         "Exclusive",
    badgeFeatured: false,
    featured:      false,
    gradient:      "from-fuchsia-950/70 to-slate-900/80",
    accentFrom:    "#e879f9",
    accentTo:      "#ec4899",
    borderIdle:    "border-white/8",
    borderHover:   "hover:border-fuchsia-500/45",
    glowColor:     "hover:shadow-fuchsia-500/10",
    services: [
      "Venue for up to 500 guests",
      "Luxury 5-star décor & draping",
      "3-day wedding coverage",
      "Master chef gourmet catering",
    ],
  },
  {
    id:            "corporate-event",
    title:         "Corporate Event",
    price:         "₹21,999",
    emoji:         "🏢",
    badge:         null,
    badgeFeatured: false,
    featured:      false,
    gradient:      "from-emerald-950/70 to-slate-900/80",
    accentFrom:    "#34d399",
    accentTo:      "#06b6d4",
    borderIdle:    "border-white/8",
    borderHover:   "hover:border-emerald-500/45",
    glowColor:     "hover:shadow-emerald-500/10",
    services: [
      "Conference hall — 250 pax",
      "Full AV & projector setup",
      "Branded stage backdrop",
      "Tea, coffee & lunch included",
    ],
  },
];

const TRUST = [
  { icon: "🔒", text: "Secure payments" },
  { icon: "↩️", text: "Free cancellation in 24 hrs" },
  { icon: "🎧", text: "24 / 7 support" },
  { icon: "✅", text: "Verified venues only" },
];

export default function FeaturedPackages() {
  return (
    <section className="relative bg-[#0d0118] py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-violet-700/6 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-pink-700/6 rounded-full blur-3xl pointer-events-none" />

      {/* Section separators */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
              Handpicked for you
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Popular{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>

          <p className="max-w-lg mx-auto text-base text-white/45 leading-relaxed">
            Handpicked event packages loved by our customers.
          </p>
        </div>

        {/* ── Cards grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* ── Trust strip ──────────────────────────────────────────────── */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-10">
          {TRUST.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-white/30">
              <span aria-hidden="true">{icon}</span>
              {text}
            </div>
          ))}
        </div>

        {/* ── Footer CTA ───────────────────────────────────────────────── */}
        <div className="mt-10 text-center">
          <Link
            to="/packages"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl
              text-sm font-semibold text-white/45 hover:text-white
              border border-white/10 hover:border-white/25 hover:bg-white/5
              transition-all duration-200 backdrop-blur-sm
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
            "
          >
            View all packages
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}