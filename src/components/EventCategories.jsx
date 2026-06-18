import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    slug:        "birthday",
    emoji:       "🎂",
    title:       "Birthday",
    description: "Throw the ultimate birthday bash with custom themes, surprise setups, and memories that last a lifetime.",
    from:        "#7c3aed",
    to:          "#ec4899",
    borderHover: "hover:border-violet-500/50",
    shadowHover: "hover:shadow-violet-500/15",
    bgFrom:      "from-violet-900/30",
    bgTo:        "to-fuchsia-900/20",
  },
  {
    slug:        "anniversary",
    emoji:       "💍",
    title:       "Anniversary",
    description: "Celebrate years of love with candlelight dinners, romantic décor, and live musical performances.",
    from:        "#f59e0b",
    to:          "#ef4444",
    borderHover: "hover:border-amber-500/50",
    shadowHover: "hover:shadow-amber-500/15",
    bgFrom:      "from-amber-900/30",
    bgTo:        "to-orange-900/20",
  },
  {
    slug:        "wedding",
    emoji:       "👰",
    title:       "Wedding",
    description: "Your dream wedding brought to life — elegant venues, floral stages, gourmet catering, and more.",
    from:        "#ec4899",
    to:          "#8b5cf6",
    borderHover: "hover:border-pink-500/50",
    shadowHover: "hover:shadow-pink-500/15",
    bgFrom:      "from-pink-900/30",
    bgTo:        "to-purple-900/20",
  },
  {
    slug:        "farewell",
    emoji:       "🎓",
    title:       "Farewell",
    description: "Give your loved ones a heartfelt send-off with memory walls, speeches, and a curated dinner.",
    from:        "#38bdf8",
    to:          "#6366f1",
    borderHover: "hover:border-sky-500/50",
    shadowHover: "hover:shadow-sky-500/15",
    bgFrom:      "from-sky-900/30",
    bgTo:        "to-indigo-900/20",
  },
  {
    slug:        "corporate",
    emoji:       "🏢",
    title:       "Corporate",
    description: "Flawlessly executed conferences, product launches, and team events that reflect your brand.",
    from:        "#34d399",
    to:          "#06b6d4",
    borderHover: "hover:border-emerald-500/50",
    shadowHover: "hover:shadow-emerald-500/15",
    bgFrom:      "from-emerald-900/30",
    bgTo:        "to-teal-900/20",
  },
  {
    slug:        "baby-shower",
    emoji:       "👶",
    title:       "Baby Shower",
    description: "Welcome the little one with adorable pastel themes, fun games, and a delightful dessert table.",
    from:        "#f472b6",
    to:          "#fb923c",
    borderHover: "hover:border-rose-500/50",
    shadowHover: "hover:shadow-rose-500/15",
    bgFrom:      "from-rose-900/30",
    bgTo:        "to-orange-900/20",
  },
];

function CategoryCard({ slug, emoji, title, description, from, to, borderHover, shadowHover, bgFrom, bgTo }) {
  return (
    <div className={`
      group relative flex flex-col rounded-2xl overflow-hidden
      bg-gradient-to-br ${bgFrom} ${bgTo}
      border border-white/8 ${borderHover}
      hover:shadow-2xl ${shadowHover}
      hover:-translate-y-2
      backdrop-blur-sm
      transition-all duration-300 ease-out
    `}>

      {/* Top shimmer line */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Hover glow wash */}
      <div aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${from}10, transparent 60%)` }} />

      {/* Corner arrow */}
      <span aria-hidden="true" className="absolute top-5 right-5 text-white/0 group-hover:text-white/25 text-sm font-bold transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>

      <div className="relative flex flex-col flex-1 p-6">

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
          style={{ background: `linear-gradient(135deg, ${from}33, ${to}33)`, border: `1px solid ${from}30` }}
        >
          <span role="img" aria-label={title}>{emoji}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{title}</h3>

        {/* Description */}
        <p className="text-sm text-white/45 leading-relaxed flex-1 mb-6">{description}</p>

        {/* View Packages button */}
        <Link
          to={`/events?category=${slug}`}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 border border-white/10 text-white/50 group-hover:text-white group-hover:border-transparent"
          style={{}}
          onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(to right, ${from}, ${to})`; e.currentTarget.style.boxShadow = `0 0 16px ${from}40`; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
        >
          View Packages
          <span aria-hidden="true" className="text-base leading-none">→</span>
        </Link>
      </div>

      {/* Bottom gradient reveal line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
      />
    </div>
  );
}

export default function EventCategories() {
  return (
    <section className="relative bg-[#0d0118] py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-violet-700/8 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-pink-700/8 rounded-full blur-3xl pointer-events-none" />

      {/* Section separators */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
              All Occasions Covered
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Celebration
            </span>
          </h2>

          <p className="max-w-lg mx-auto text-base text-white/45 leading-relaxed">
            Find the perfect event experience for every occasion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white/45 hover:text-white border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Browse all events
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}