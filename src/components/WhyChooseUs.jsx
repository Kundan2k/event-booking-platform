const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title:       "Easy Booking",
    description: "Book your dream event in minutes with our streamlined checkout. Choose a package, pick a date, and confirm — no back-and-forth calls needed.",
    accentFrom:  "from-violet-500",
    accentTo:    "to-fuchsia-500",
    glow:        "group-hover:shadow-violet-500/20",
    border:      "group-hover:border-violet-500/50",
    number:      "01",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeWidth="2" />
      </svg>
    ),
    title:       "Trusted Vendors",
    description: "Every venue and vendor on Eventora is handpicked, background-verified, and rated by real customers — so you always get quality you can count on.",
    accentFrom:  "from-pink-500",
    accentTo:    "to-rose-500",
    glow:        "group-hover:shadow-pink-500/20",
    border:      "group-hover:border-pink-500/50",
    number:      "02",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="17" cy="15" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    title:       "Secure Payments",
    description: "Your transactions are protected by bank-grade encryption. Pay with UPI, cards, or net banking — and get instant confirmation every time.",
    accentFrom:  "from-emerald-500",
    accentTo:    "to-teal-500",
    glow:        "group-hover:shadow-emerald-500/20",
    border:      "group-hover:border-emerald-500/50",
    number:      "03",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title:       "Dedicated Support",
    description: "Our event specialists are available 24 / 7 via chat, call, or email. From planning to the last dance, we're always just one message away.",
    accentFrom:  "from-amber-500",
    accentTo:    "to-orange-500",
    glow:        "group-hover:shadow-amber-500/20",
    border:      "group-hover:border-amber-500/50",
    number:      "04",
  },
];

function FeatureCard({ icon, title, description, accentFrom, accentTo, glow, border, number }) {
  return (
    <div className={`
      group relative flex flex-col rounded-2xl p-7 overflow-hidden
      bg-white/[0.03] border border-white/8 ${border}
      hover:shadow-2xl ${glow}
      hover:-translate-y-2
      backdrop-blur-sm
      transition-all duration-300 ease-out
    `}>

      {/* Top inner shimmer */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* Background number watermark */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-5 text-6xl font-black text-white/[0.03] select-none pointer-events-none leading-none"
      >
        {number}
      </div>

      {/* Hover gradient wash */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${accentFrom}/0 ${accentTo}/0 group-hover:${accentFrom}/5 group-hover:${accentTo}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      {/* Icon container */}
      <div className={`
        relative w-14 h-14 rounded-2xl mb-6 flex items-center justify-center
        bg-gradient-to-br ${accentFrom} ${accentTo}
        shadow-lg
        group-hover:scale-110 group-hover:rotate-3
        transition-transform duration-300
        text-white
      `}>
        {/* Glow behind icon */}
        <div aria-hidden="true" className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10`} />
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/45 leading-relaxed flex-1">
        {description}
      </p>

      {/* Bottom reveal line */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${accentFrom} ${accentTo} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
      />
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#0d0118] py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[400px] bg-violet-700/8 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-pink-700/8 rounded-full blur-3xl pointer-events-none" />

      {/* Section separators */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
              Why Eventora
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Why{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>

          <p className="max-w-lg mx-auto text-base text-white/45 leading-relaxed">
            Everything you need to plan, book, and celebrate — all under one roof.
          </p>
        </div>

        {/* ── Feature cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        {/* ── Bottom stat strip ─────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "12k+",  label: "Events Booked",  from: "from-violet-400", to: "to-fuchsia-400" },
            { value: "500+",  label: "Verified Vendors", from: "from-pink-400",   to: "to-rose-400"   },
            { value: "98%",   label: "Satisfaction Rate", from: "from-emerald-400", to: "to-teal-400" },
            { value: "24/7",  label: "Customer Support", from: "from-amber-400",  to: "to-orange-400" },
          ].map(({ value, label, from, to }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center py-6 px-4 rounded-2xl bg-white/[0.03] border border-white/8"
            >
              <p className={`text-2xl sm:text-3xl font-extrabold bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent leading-none mb-1`}>
                {value}
              </p>
              <p className="text-xs text-white/35 tracking-wide mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}