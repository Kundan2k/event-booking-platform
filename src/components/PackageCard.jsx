import { Link } from "react-router-dom";

export default function PackageCard({ pkg }) {
  const { id, title, price, emoji, badge, badgeFeatured, gradient, accentFrom, accentTo, borderIdle, borderHover, glowColor, featured, services } = pkg;

  return (
    <div className={`
      group relative flex flex-col rounded-2xl overflow-hidden
      border ${borderIdle} ${borderHover}
      bg-gradient-to-b ${gradient}
      backdrop-blur-sm
      transition-all duration-300 ease-out
      hover:-translate-y-2 hover:shadow-2xl ${glowColor}
      ${featured ? "ring-1 ring-violet-500/40 shadow-xl shadow-violet-500/15" : ""}
    `}>

      {/* Top inner shimmer line */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className={`
            px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase
            ${badgeFeatured
              ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/40"
              : "bg-white/10 text-white/65 border border-white/15 backdrop-blur-sm"}
          `}>
            {badge}
          </span>
        </div>
      )}

      {/* Image placeholder */}
      <div className={`
        relative h-44 flex items-center justify-center overflow-hidden
        bg-gradient-to-br ${gradient}
      `}>
        {/* Colour wash */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br from-[${accentFrom}]/10 to-[${accentTo}]/10 group-hover:opacity-60 opacity-30 transition-opacity duration-300`}
        />
        {/* Shine sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        />
        {/* Emoji hero */}
        <span
          className="relative text-7xl select-none drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
          role="img"
          aria-label={title}
        >
          {emoji}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">

        {/* Title + price */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <h3 className="text-base font-bold text-white leading-snug">{title}</h3>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] text-white/35 mb-0.5">Starting at</p>
            <p
              className="text-lg font-extrabold leading-none"
              style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {price}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="h-px w-full mb-5 opacity-20"
          style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
        />

        {/* Services list */}
        <ul className="flex-1 space-y-2.5 mb-6">
          {services.map((s) => (
            <li key={s} className="flex items-start gap-2.5 text-sm text-white/55">
              <span
                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
                aria-hidden="true"
              >
                ✓
              </span>
              {s}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to={`/booking?package=${id}`}
          className={`
            relative overflow-hidden group/btn
            w-full text-center py-3 rounded-xl text-sm font-bold tracking-wide
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400
            ${featured
              ? "text-white shadow-lg hover:shadow-violet-500/40"
              : "border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/6"}
          `}
          style={featured
            ? { background: `linear-gradient(to right, #7c3aed, #ec4899)` }
            : {}}
        >
          {featured && (
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"
            />
          )}
          Book Now
        </Link>
      </div>
    </div>
  );
}