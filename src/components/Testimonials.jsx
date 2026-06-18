const TESTIMONIALS = [
  {
    id:       1,
    name:     "Priya Sharma",
    role:     "Birthday Celebration · Mumbai",
    initials: "PS",
    from:     "from-violet-500",
    to:       "to-fuchsia-500",
    rating:   5,
    review:   "Eventora made my daughter's birthday truly magical. Every detail — the balloon arch, cake station, even the return gifts — was handled perfectly. We just showed up and enjoyed. Absolutely worth every rupee!",
    package:  "Birthday Premium",
    emoji:    "🎂",
  },
  {
    id:       2,
    name:     "Rahul & Meera Verma",
    role:     "Wedding Reception · Delhi",
    initials: "RV",
    from:     "from-pink-500",
    to:       "to-rose-500",
    rating:   5,
    review:   "Our wedding reception was a dream come true. The décor, catering, and photography were all flawless. Our guests still call it the most beautiful wedding they've attended. The team was calm, creative, and professional throughout.",
    package:  "Wedding Premium",
    emoji:    "💍",
  },
  {
    id:       3,
    name:     "Ankit Joshi",
    role:     "Corporate Annual Meet · Bengaluru",
    initials: "AJ",
    from:     "from-emerald-500",
    to:       "to-teal-500",
    rating:   5,
    review:   "Booked the Corporate package for our 200-person annual meet. AV setup was flawless, the branded stage looked stunning, and the lunch spread was excellent. Zero hiccups from start to finish. Will definitely rebook next year.",
    package:  "Corporate Event",
    emoji:    "💼",
  },
];

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-white/15"}`}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ name, role, initials, from, to, rating, review, package: pkg, emoji }) {
  return (
    <div className="
      group relative flex flex-col rounded-2xl p-7 overflow-hidden
      bg-white/[0.04] border border-white/8
      hover:border-white/18 hover:bg-white/[0.06]
      hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30
      backdrop-blur-sm
      transition-all duration-300 ease-out
    ">
      {/* Top shimmer */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Large quote watermark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-6 text-8xl font-serif leading-none text-white/[0.04] select-none pointer-events-none"
      >
        "
      </div>

      {/* Package pill */}
      <div className="flex items-center gap-1.5 mb-6">
        <span className="text-sm" aria-hidden="true">{emoji}</span>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-white/35 border border-white/10 px-2.5 py-1 rounded-full bg-white/5">
          {pkg}
        </span>
      </div>

      {/* Stars */}
      <Stars count={rating} />

      {/* Review */}
      <blockquote className="mt-4 mb-7 text-sm text-white/60 leading-relaxed flex-1">
        "{review}"
      </blockquote>

      {/* Divider */}
      <div aria-hidden="true" className="h-px bg-white/8 mb-5" />

      {/* Author row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-11 h-11 rounded-full
          bg-gradient-to-br ${from} ${to}
          flex items-center justify-center
          text-sm font-bold text-white
          ring-2 ring-white/10
          shadow-lg
        `}>
          {initials}
          {/* Photo placeholder — swap div above for <img> when ready:
          <img src="/avatars/customer.jpg" alt={name}
            className="w-full h-full object-cover rounded-full" />
          */}
        </div>

        <div>
          <p className="text-sm font-bold text-white leading-none mb-1">{name}</p>
          <p className="text-xs text-white/35">{role}</p>
        </div>

        {/* Verified badge */}
        <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-emerald-400" aria-hidden="true">
            <path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[10px] font-semibold text-emerald-400">Verified</span>
        </div>
      </div>

      {/* Bottom reveal line */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${from} ${to} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative bg-[#0d0118] py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-fuchsia-700/6 rounded-full blur-3xl pointer-events-none" />

      {/* Separators */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
              Real Stories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="max-w-md mx-auto text-base text-white/45 leading-relaxed">
            Over 12,000 events and counting — here's why families and businesses trust Eventora.
          </p>

          {/* Overall rating pill */}
          <div className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-white">4.9</span>
            <span className="text-xs text-white/35">from 3,200+ reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>

        {/* Bottom avatar strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex -space-x-3">
            {[
              { i: "PS", f: "from-violet-500", t: "to-fuchsia-500" },
              { i: "RV", f: "from-pink-500",   t: "to-rose-500"   },
              { i: "AJ", f: "from-emerald-500", t: "to-teal-500"  },
              { i: "NK", f: "from-amber-500",   t: "to-orange-500" },
              { i: "SM", f: "from-sky-500",     t: "to-blue-500"  },
            ].map(({ i, f, t }) => (
              <div
                key={i}
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${f} ${t} flex items-center justify-center text-xs font-bold text-white ring-2 ring-[#0d0118]`}
                aria-hidden="true"
              >
                {i}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/40 text-center sm:text-left">
            Joined by <span className="text-white/70 font-semibold">12,000+</span> happy customers across India
          </p>
        </div>
      </div>
    </section>
  );
}