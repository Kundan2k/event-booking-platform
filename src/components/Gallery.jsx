import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── Gallery data ─────────────────────────────────────────────────────────── */
const ITEMS = [
  {
    id: 1,
    type:     "Birthday",
    emoji:    "🎂",
    title:    "Royal Birthday Bash",
    location: "The Grand Ballroom, Mumbai",
    guests:   120,
    year:     "2025",
    span:     "col-span-1 row-span-1",
    from:     "#7c3aed",
    to:       "#ec4899",
    bg:       "from-violet-900/70 to-fuchsia-900/50",
    tag:      "from-violet-500 to-fuchsia-500",
  },
  {
    id: 2,
    type:     "Wedding",
    emoji:    "👰",
    title:    "Dream Wedding Ceremony",
    location: "Blue Lotus Resort, Pune",
    guests:   350,
    year:     "2025",
    span:     "col-span-1 row-span-2 sm:col-span-1",
    from:     "#ec4899",
    to:       "#8b5cf6",
    bg:       "from-pink-900/70 to-purple-900/50",
    tag:      "from-pink-500 to-purple-500",
  },
  {
    id: 3,
    type:     "Anniversary",
    emoji:    "💍",
    title:    "Silver Jubilee Candlelight",
    location: "Rosewood Garden, Delhi",
    guests:   40,
    year:     "2025",
    span:     "col-span-1 row-span-1",
    from:     "#f59e0b",
    to:       "#ef4444",
    bg:       "from-amber-900/70 to-orange-900/50",
    tag:      "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    type:     "Corporate",
    emoji:    "🏢",
    title:    "Annual Leadership Summit",
    location: "Pearl Convention Centre, Chennai",
    guests:   250,
    year:     "2025",
    span:     "col-span-1 row-span-1 sm:col-span-2",
    from:     "#34d399",
    to:       "#06b6d4",
    bg:       "from-emerald-900/70 to-teal-900/50",
    tag:      "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    type:     "Farewell",
    emoji:    "🎓",
    title:    "Team Farewell Gala",
    location: "The Heritage Hall, Hyderabad",
    guests:   80,
    year:     "2024",
    span:     "col-span-1 row-span-1",
    from:     "#38bdf8",
    to:       "#6366f1",
    bg:       "from-sky-900/70 to-indigo-900/50",
    tag:      "from-sky-500 to-indigo-500",
  },
  {
    id: 6,
    type:     "Baby Shower",
    emoji:    "👶",
    title:    "Royal Baby Welcome",
    location: "Skyline Terrace, Bengaluru",
    guests:   55,
    year:     "2025",
    span:     "col-span-1 row-span-1",
    from:     "#f472b6",
    to:       "#fb923c",
    bg:       "from-rose-900/70 to-orange-900/50",
    tag:      "from-rose-500 to-orange-400",
  },
  {
    id: 7,
    type:     "Product Launch",
    emoji:    "🚀",
    title:    "NextGen Product Reveal",
    location: "Infinity Hall, Mumbai",
    guests:   180,
    year:     "2025",
    span:     "col-span-1 row-span-1 sm:col-span-1",
    from:     "#a78bfa",
    to:       "#34d399",
    bg:       "from-violet-900/70 to-emerald-900/50",
    tag:      "from-violet-500 to-emerald-500",
  },
  {
    id: 8,
    type:     "Conference",
    emoji:    "🎤",
    title:    "TechSummit India 2025",
    location: "Expo Centre, Bengaluru",
    guests:   600,
    year:     "2025",
    span:     "col-span-1 row-span-1",
    from:     "#818cf8",
    to:       "#c084fc",
    bg:       "from-indigo-900/70 to-purple-900/50",
    tag:      "from-indigo-500 to-purple-500",
  },
];

const FILTERS = ["All","Birthday","Wedding","Anniversary","Corporate","Farewell","Baby Shower","Product Launch","Conference"];

/* ─── GalleryItem ──────────────────────────────────────────────────────────── */
function GalleryItem({ item }) {
  const { id, type, emoji, title, location, guests, year, span, from, to, bg, tag } = item;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${span} group relative rounded-2xl overflow-hidden cursor-pointer
        border border-white/8 transition-all duration-500 ease-out
        hover:-translate-y-1.5 hover:shadow-2xl`}
      style={{
        minHeight: "220px",
        boxShadow: hovered ? `0 20px 60px ${from}30, 0 0 0 1px ${from}40` : undefined,
        border: hovered ? `1px solid ${from}45` : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bg} transition-all duration-500`} />

      {/* Animated shimmer grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"24px 24px"}}
      />

      {/* Main emoji illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[80px] sm:text-[100px] select-none opacity-20 transition-all duration-500 group-hover:opacity-30 group-hover:scale-110"
          aria-hidden="true"
        >
          {emoji}
        </span>
      </div>

      {/* Center focal emoji */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{
            background:`linear-gradient(135deg,${from}60,${to}40)`,
            border:`1px solid ${from}40`,
            backdropFilter:"blur(8px)",
          }}
        >
          {emoji}
        </div>
      </div>

      {/* Gradient border glow on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:`linear-gradient(135deg,${from}15,${to}08)`,
          boxShadow:`inset 0 0 40px ${from}15`,
        }}
      />

      {/* Top shimmer */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Type badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg"
          style={{background:`linear-gradient(to right,${from},${to})`}}
        >
          <span aria-hidden="true">{emoji}</span>
          {type}
        </span>
      </div>

      {/* Year badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="text-[10px] font-semibold text-white/40 bg-black/30 border border-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
          {year}
        </span>
      </div>

      {/* Bottom info bar — always visible */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-4"
        style={{background:"linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 100%)"}}>
        <p className="text-sm font-bold text-white leading-snug mb-1 truncate">{title}</p>
        <div className="flex items-center justify-between gap-2 text-xs text-white/45">
          <span className="flex items-center gap-1 truncate">
            <span aria-hidden="true">📍</span>
            <span className="truncate">{location.split(",")[0]}</span>
          </span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <span aria-hidden="true">👥</span>
            {guests}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className={`
        absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center
        transition-all duration-400 ease-out
        ${hovered ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        style={{background:`linear-gradient(135deg,${from}85,${to}70)`,backdropFilter:"blur(2px)"}}
      >
        {/* Shine sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        />

        <span className="text-5xl mb-4 drop-shadow-2xl" aria-hidden="true">{emoji}</span>

        <h3 className="text-base font-extrabold text-white mb-1 leading-tight">{title}</h3>
        <p className="text-xs text-white/70 mb-1 flex items-center gap-1 justify-center">
          <span aria-hidden="true">📍</span>{location}
        </p>
        <p className="text-xs text-white/60 mb-5 flex items-center gap-1 justify-center">
          <span aria-hidden="true">👥</span>{guests} guests · {year}
        </p>

        <Link
          to={`/events/${id}`}
          className="relative overflow-hidden group/btn px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",backdropFilter:"blur(8px)"}}
          onClick={e => e.stopPropagation()}
        >
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
          View Event →
        </Link>
      </div>
    </div>
  );
}

/* ─── Gallery ──────────────────────────────────────────────────────────────── */
export default function Gallery() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? ITEMS : ITEMS.filter(i => i.type === active);

  return (
    <section className="relative bg-[#0d0118] py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute top-1/4 -left-40 w-[600px] h-[500px] bg-violet-700/8 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-1/4 -right-40 w-[500px] h-[400px] bg-pink-700/8 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-fuchsia-700/5 rounded-full blur-3xl pointer-events-none" />

      {/* Separators */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
              Event Highlights
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Memories We've{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Created
            </span>
          </h2>

          <p className="max-w-lg mx-auto text-base text-white/45 leading-relaxed">
            Explore some of our most memorable celebrations and events across India.
          </p>
        </div>

        {/* ── Filter chips ─────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold border
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                ${active === f
                  ? "text-white border-transparent shadow-lg shadow-violet-500/25"
                  : "text-white/45 border-white/10 bg-white/[0.03] hover:border-white/25 hover:text-white/75"}
              `}
              style={active === f ? {background:"linear-gradient(to right,#7c3aed,#ec4899)"} : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Mosaic grid ──────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-4">
            {filtered.map(item => (
              <GalleryItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-5">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No items found</h3>
            <p className="text-sm text-white/35 mb-6">Try selecting a different category.</p>
            <button
              onClick={() => setActive("All")}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}
            >
              View All
            </button>
          </div>
        )}

        {/* ── Stats strip ──────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { v:"500+",  l:"Events Captured",  a:"#a78bfa", b:"#ec4899" },
            { v:"12k+",  l:"Happy Clients",    a:"#34d399", b:"#06b6d4" },
            { v:"10",    l:"Cities Covered",   a:"#fbbf24", b:"#f59e0b" },
            { v:"4.9★",  l:"Average Rating",   a:"#f472b6", b:"#fb7185" },
          ].map(({ v, l, a, b }) => (
            <div key={l} className="rounded-2xl bg-white/[0.03] border border-white/8 py-5 px-4 text-center hover:border-white/15 transition-all duration-200">
              <p className="text-2xl font-extrabold mb-1"
                style={{background:`linear-gradient(to right,${a},${b})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                {v}
              </p>
              <p className="text-xs text-white/30 font-medium">{l}</p>
            </div>
          ))}
        </div>

        {/* ── Footer CTA ───────────────────────────────────────────── */}
        <div className="mt-10 text-center">
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