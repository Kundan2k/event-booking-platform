import { Link } from "react-router-dom";

const BADGES = [
  { emoji: "🎂", label: "Birthday" },
  { emoji: "💍", label: "Wedding" },
  { emoji: "🥂", label: "Anniversary" },
  { emoji: "👋", label: "Farewell" },
  { emoji: "💼", label: "Corporate" },
];

const STATS = [
  { value: "12k+", label: "Events Booked" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "150+", label: "Venues" },
];

/* Floating decoration cards around the illustration */
const FLOATERS = [
  {
    pos: "absolute -top-6 -left-8",
    content: <><span className="text-2xl">🎈</span><span className="text-2xl">🎈</span></>,
    delay: "0s",
  },
  {
    pos: "absolute top-6 -right-10",
    content: <><span className="text-xl">🎁</span></>,
    delay: "0.6s",
  },
  {
    pos: "absolute bottom-8 -left-10",
    content: <><span className="text-xl">🎊</span></>,
    delay: "1.2s",
  },
  {
    pos: "absolute -bottom-6 right-0",
    content: <><span className="text-2xl">✨</span></>,
    delay: "0.3s",
  },
];

function FloatCard({ pos, content, delay }) {
  return (
    <div
      className={`${pos} w-14 h-14 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-md flex items-center justify-center gap-0.5 shadow-xl animate-bounce`}
      style={{ animationDuration: "3s", animationDelay: delay }}
      aria-hidden="true"
    >
      {content}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0d0118] overflow-hidden">

      {/* ── Ambient background glows ───────────────────────────────────── */}
      <div aria-hidden="true" className="absolute -top-56 -left-56 w-[800px] h-[800px] rounded-full bg-violet-700/20 blur-[130px]" />
      <div aria-hidden="true" className="absolute -bottom-56 -right-56 w-[700px] h-[700px] rounded-full bg-pink-600/15 blur-[130px]" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full bg-violet-900/10 blur-3xl" />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Diagonal gradient sweep */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-transparent to-pink-950/20"
      />

      {/* Top accent line */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: Copy ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-start">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/6 border border-white/12 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-widest text-white/55 uppercase">
                Premium Event Experiences
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.06] tracking-tight text-white mb-6">
              Make Every{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Celebration
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 opacity-50"
                />
              </span>
              <br />Memorable
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-10 max-w-lg">
              Book birthdays, anniversaries, weddings, farewells and corporate
              events in minutes.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-12">
              <Link
                to="/booking"
                className="
                  relative overflow-hidden group
                  px-8 py-4 rounded-xl text-sm font-bold text-white tracking-wide text-center
                  bg-gradient-to-r from-violet-600 to-pink-500
                  hover:from-violet-500 hover:to-pink-400
                  shadow-[0_0_28px_rgba(124,58,237,0.45)]
                  hover:shadow-[0_0_40px_rgba(236,72,153,0.55)]
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400
                "
              >
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                🎉&nbsp; Book Event
              </Link>

              <Link
                to="/packages"
                className="
                  px-8 py-4 rounded-xl text-sm font-bold text-center
                  text-white/65 hover:text-white
                  border border-white/15 hover:border-violet-400/50
                  hover:bg-violet-500/10
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-200 backdrop-blur-sm
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                "
              >
                Explore Packages&nbsp; →
              </Link>
            </div>

            {/* Event type badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {BADGES.map(({ emoji, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/50 bg-white/5 border border-white/10 hover:border-violet-400/40 hover:text-white/75 transition-all duration-200 cursor-default select-none"
                >
                  <span aria-hidden="true">{emoji}</span>{label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 sm:gap-10">
              {STATS.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-6 sm:gap-10">
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent leading-none">
                      {value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/30 mt-1 tracking-widest uppercase">{label}</p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div aria-hidden="true" className="w-px h-8 bg-white/10 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Illustration ────────────────────────────────────── */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[420px] xl:w-[480px] aspect-square">

              {/* Outer slow-spin ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-dashed border-violet-500/20 animate-spin"
                style={{ animationDuration: "25s" }}
              />
              {/* Middle counter-spin ring */}
              <div
                aria-hidden="true"
                className="absolute inset-10 rounded-full border border-dashed border-pink-500/15 animate-spin"
                style={{ animationDuration: "18s", animationDirection: "reverse" }}
              />

              {/* Main glassmorphism card */}
              <div className="
                absolute inset-14 rounded-3xl
                bg-gradient-to-br from-violet-900/50 via-fuchsia-900/30 to-pink-900/40
                border border-white/12 backdrop-blur-sm
                flex flex-col items-center justify-center gap-5
                shadow-[0_0_80px_rgba(124,58,237,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]
                overflow-hidden
              ">
                {/* Inner glow */}
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Confetti burst decoration */}
                <div aria-hidden="true" className="absolute top-4 left-4 text-2xl opacity-40 animate-bounce" style={{ animationDuration: "2.5s" }}>🎊</div>
                <div aria-hidden="true" className="absolute top-4 right-4 text-2xl opacity-40 animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.4s" }}>✨</div>
                <div aria-hidden="true" className="absolute bottom-4 left-4 text-2xl opacity-40 animate-bounce" style={{ animationDuration: "2.8s", animationDelay: "0.8s" }}>🎉</div>
                <div aria-hidden="true" className="absolute bottom-4 right-4 text-2xl opacity-40 animate-bounce" style={{ animationDuration: "2.2s", animationDelay: "1.2s" }}>🎀</div>

                {/* Central icon */}
                <div className="
                  w-24 h-24 rounded-2xl flex items-center justify-center
                  bg-gradient-to-br from-violet-600 to-pink-500
                  shadow-[0_0_40px_rgba(124,58,237,0.6)]
                ">
                  <span className="text-5xl" role="img" aria-label="Celebration">🎊</span>
                </div>

                {/* Label */}
                <div className="text-center px-6">
                  <p className="text-sm font-semibold text-white/70 leading-snug">
                    Your Celebration
                  </p>
                  <p className="text-xs text-white/30 mt-1">
                    Replace with your hero image
                  </p>
                  {/* ↓ Swap comment below for <img> when ready */}
                  {/* <img src="/hero.jpg" alt="Event" className="absolute inset-0 w-full h-full object-cover rounded-3xl" /> */}
                </div>

                {/* Bottom mini stat pill */}
                <div className="px-4 py-2 rounded-full bg-white/8 border border-white/12 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-white/60">
                    <span className="text-violet-400 font-bold">12,000+</span> events celebrated 🎈
                  </p>
                </div>
              </div>

              {/* Floating decoration cards */}
              {FLOATERS.map((f, i) => (
                <FloatCard key={i} {...f} />
              ))}

              {/* Info badge — top right */}
              <div className="absolute -top-2 right-2 px-3.5 py-2.5 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-md shadow-2xl">
                <p className="text-xs font-bold text-white leading-none">Instant Booking</p>
                <p className="text-[10px] text-emerald-400 mt-1 font-medium">✓ Confirm in minutes</p>
              </div>

              {/* Info badge — bottom left */}
              <div className="absolute bottom-2 -left-2 px-3.5 py-2.5 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-md shadow-2xl">
                <p className="text-xs font-bold text-white leading-none">Trusted by</p>
                <p className="text-[10px] text-pink-400 mt-1 font-medium">12k+ happy clients ★</p>
              </div>

              {/* Ambient glow */}
              <div aria-hidden="true" className="absolute inset-8 rounded-full bg-violet-600/15 blur-3xl -z-10" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#0d0118] to-transparent pointer-events-none" />
    </section>
  );
}