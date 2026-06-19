import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { label: "All",        value: "all",        emoji: "✨" },
  { label: "Birthday",   value: "birthday",   emoji: "🎂" },
  { label: "Anniversary",value: "anniversary",emoji: "💍" },
  { label: "Wedding",    value: "wedding",    emoji: "👰" },
  { label: "Farewell",   value: "farewell",   emoji: "🎓" },
  { label: "Corporate",  value: "corporate",  emoji: "🏢" },
  { label: "Baby Shower",value: "baby-shower",emoji: "👶" },
];

const EVENTS = [
  {
    id: 1, category: "birthday",
    title: "Royal Birthday Bash",
    description: "A grand birthday celebration with premium décor, live music, and a custom cake for your special one.",
    emoji: "🎂", from: "from-pink-900/60", to: "to-rose-900/40",
    accent: "#fb7185", tag: "Birthday", price: "From ₹8,999",
  },
  {
    id: 2, category: "birthday",
    title: "Surprise Party Setup",
    description: "Intimate surprise birthday setup with balloon arch, photo booth, and themed decorations.",
    emoji: "🎉", from: "from-fuchsia-900/60", to: "to-pink-900/40",
    accent: "#e879f9", tag: "Birthday", price: "From ₹5,999",
  },
  {
    id: 3, category: "anniversary",
    title: "Candlelight Anniversary",
    description: "Romantic candlelight dinner with floral setup, fairy lights, and a live acoustic performance.",
    emoji: "🥂", from: "from-amber-900/60", to: "to-orange-900/40",
    accent: "#fbbf24", tag: "Anniversary", price: "From ₹12,999",
  },
  {
    id: 4, category: "anniversary",
    title: "Silver Jubilee Celebration",
    description: "Mark 25 years of togetherness with a grand family gathering, photo wall, and memory reel.",
    emoji: "💍", from: "from-yellow-900/60", to: "to-amber-900/40",
    accent: "#f59e0b", tag: "Anniversary", price: "From ₹17,999",
  },
  {
    id: 5, category: "wedding",
    title: "Dream Wedding Ceremony",
    description: "Full-scale wedding planning with mandap décor, catering, photography and bridal suite.",
    emoji: "👰", from: "from-violet-900/60", to: "to-purple-900/40",
    accent: "#a78bfa", tag: "Wedding", price: "From ₹49,999",
  },
  {
    id: 6, category: "wedding",
    title: "Intimate Garden Wedding",
    description: "A beautiful outdoor garden wedding setup for 50–80 guests with floral arches and fairy lights.",
    emoji: "💒", from: "from-emerald-900/60", to: "to-teal-900/40",
    accent: "#34d399", tag: "Wedding", price: "From ₹29,999",
  },
  {
    id: 7, category: "farewell",
    title: "Farewell Send-Off Party",
    description: "Heartfelt farewell event with memory wall, personalized gifts, speeches, and a group dinner.",
    emoji: "🎓", from: "from-sky-900/60", to: "to-blue-900/40",
    accent: "#38bdf8", tag: "Farewell", price: "From ₹7,999",
  },
  {
    id: 8, category: "farewell",
    title: "Office Farewell Event",
    description: "Professional team farewell with catered lunch, awards ceremony, and curated memory book.",
    emoji: "👋", from: "from-indigo-900/60", to: "to-sky-900/40",
    accent: "#818cf8", tag: "Farewell", price: "From ₹9,999",
  },
  {
    id: 9, category: "corporate",
    title: "Annual Corporate Meet",
    description: "Large-scale corporate event with AV setup, branded stage, keynote arrangements, and lunch.",
    emoji: "🏢", from: "from-slate-800/60", to: "to-gray-900/40",
    accent: "#94a3b8", tag: "Corporate", price: "From ₹24,999",
  },
  {
    id: 10, category: "corporate",
    title: "Product Launch Event",
    description: "Premium product launch with stage lighting, media setup, live streaming, and networking zone.",
    emoji: "🚀", from: "from-cyan-900/60", to: "to-teal-900/40",
    accent: "#22d3ee", tag: "Corporate", price: "From ₹34,999",
  },
  {
    id: 11, category: "baby-shower",
    title: "Sweet Baby Shower",
    description: "Adorable pastel-themed baby shower with games, gift station, and a custom dessert table.",
    emoji: "👶", from: "from-rose-900/60", to: "to-pink-900/40",
    accent: "#fb7185", tag: "Baby Shower", price: "From ₹6,999",
  },
  {
    id: 12, category: "baby-shower",
    title: "Royal Baby Welcome",
    description: "Luxurious baby shower with balloon ceiling, floral wall backdrop, and premium return gifts.",
    emoji: "🍼", from: "from-purple-900/60", to: "to-fuchsia-900/40",
    accent: "#c084fc", tag: "Baby Shower", price: "From ₹10,999",
  },
];

function EventCard({ id, title, description, emoji, from, to, accent, tag, price }) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out backdrop-blur-sm">

      {/* Top shimmer */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* Image placeholder */}
      <div className={`relative h-44 flex items-center justify-center bg-gradient-to-br ${from} ${to} overflow-hidden`}>
        {/* Shine sweep */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        <span className="relative text-6xl select-none drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" role="img" aria-label={title}>
          {emoji}
        </span>
        {/* Tag pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/30 border border-white/15 backdrop-blur-sm text-white/70">
          {tag}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-bold text-white leading-snug">{title}</h3>
        </div>
        <p className="text-xs font-semibold mb-3" style={{ color: accent }}>{price}</p>
        <p className="text-sm text-white/45 leading-relaxed flex-1 mb-5">{description}</p>

        <Link
          to={`/events/${id}`}
          className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white border border-white/12 hover:border-white/30 hover:bg-white/6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          View Details →
        </Link>
      </div>

      {/* Bottom reveal line */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
    </div>
  );
}

export default function Events() {
  const [search,   setSearch]   = useState("");
  const [active,   setActive]   = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return EVENTS.filter((e) => {
      const matchCat  = active === "all" || e.category === active;
      const matchSearch = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.tag.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, active]);

  return (
    <div className="min-h-screen bg-[#0d0118]">

      {/* ── Page hero banner ─────────────────────────────────────────── */}
      <div className="relative pt-[70px] overflow-hidden">
        <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[100px]" />
        <div aria-hidden="true" className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/10 blur-[100px]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Browse Events</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Perfect Event
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-base text-white/45 leading-relaxed mb-10">
            Browse all our curated events and find the right celebration for every occasion.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black/30" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, categories..."
              aria-label="Search events"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/6 border border-white/12 text-black placeholder:text-white/25 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-colors duration-200 backdrop-blur-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── Category filter chips ─────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map(({ label, value, emoji }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              aria-pressed={active === value}
              className={`
                inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                border transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                ${active === value
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white border-transparent shadow-lg shadow-violet-500/30"
                  : "bg-white/5 text-white/50 border-white/10 hover:border-white/25 hover:text-white hover:bg-white/8"}
              `}
            >
              <span aria-hidden="true">{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-white/35">
            Showing <span className="text-white/70 font-semibold">{filtered.length}</span> event{filtered.length !== 1 ? "s" : ""}
            {active !== "all" && <span> in <span className="text-violet-400 font-semibold">{CATEGORIES.find(c => c.value === active)?.label}</span></span>}
            {search && <span> for "<span className="text-pink-400 font-semibold">{search}</span>"</span>}
          </p>
          {(active !== "all" || search) && (
            <button
              onClick={() => { setActive("all"); setSearch(""); }}
              className="text-xs text-white/30 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ── Events grid ──────────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-5">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No events found</h3>
            <p className="text-sm text-white/40 mb-6 max-w-xs">
              Try adjusting your search or clearing the category filter.
            </p>
            <button
              onClick={() => { setActive("all"); setSearch(""); }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              View all events
            </button>
          </div>
        )}
      </div>
    </div>
  );
}