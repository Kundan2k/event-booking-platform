import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "Events",   to: "/events" },
  { label: "Packages", to: "/packages" },
  { label: "Contact",  to: "/contact" },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* deepen glass on scroll */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* close drawer on navigate */
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const active = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${scrolled
          ? "bg-[#06010f]/70 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.06)] border-b border-white/[0.07]"
          : "bg-transparent border-b border-transparent"}
      `}
    >
      {/* ── Thin emerald top accent line ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
      />

      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link
            to="/"
            aria-label="Eventora home"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            {/* Hexagon mark */}
            <svg
              width="32" height="32" viewBox="0 0 32 32"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:rotate-[15deg]"
            >
              <polygon
                points="16,2 28,9 28,23 16,30 4,23 4,9"
                fill="none"
                stroke="url(#eg)"
                strokeWidth="2"
              />
              <polygon
                points="16,8 23,12 23,20 16,24 9,20 9,12"
                fill="url(#eg)"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="eg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>

            <span className="text-[1.15rem] font-bold tracking-[-0.01em] text-white">
              Event<span className="text-emerald-400">ora</span>
            </span>
          </Link>

          {/* ── Desktop links ─────────────────────────────────────────── */}
          <ul className="hidden md:flex items-center" role="list">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`
                    relative px-5 py-2 text-sm font-medium tracking-wide
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded
                    ${active(to)
                      ? "text-white"
                      : "text-white/45 hover:text-white/80"}
                  `}
                >
                  {label}
                  {/* Animated underline */}
                  <span
                    aria-hidden="true"
                    className={`
                      absolute bottom-0 left-5 right-5 h-px rounded-full
                      bg-gradient-to-r from-emerald-400 to-teal-400
                      transition-transform duration-300 origin-left
                      ${active(to) ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTAs ──────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className="
                px-5 py-2 rounded-lg text-sm font-medium
                text-white/55 hover:text-white
                hover:bg-white/[0.06]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
              "
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="
                px-5 py-2 rounded-lg text-sm font-semibold text-[#06010f]
                bg-gradient-to-r from-emerald-400 to-teal-400
                hover:from-emerald-300 hover:to-teal-300
                shadow-[0_0_20px_rgba(52,211,153,0.25)]
                hover:shadow-[0_0_28px_rgba(52,211,153,0.45)]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
              "
            >
              Register
            </Link>
          </div>

          {/* ── Hamburger ─────────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="
              md:hidden relative w-10 h-10 rounded-lg
              border border-white/10 hover:border-white/25
              hover:bg-white/[0.05]
              flex items-center justify-center
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
            "
          >
            <span className={`absolute w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${open ? "rotate-45"            : "-translate-y-1.5"}`} />
            <span className={`absolute w-5 h-[1.5px] bg-white rounded-full transition-all duration-200 ${open ? "opacity-0 scale-x-0"  : "opacity-100"}`} />
            <span className={`absolute w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${open ? "-rotate-45"           : "translate-y-1.5"}`} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <div
        id="mobile-nav"
        role="region"
        aria-label="Mobile navigation"
        className={`
          md:hidden overflow-hidden
          transition-all duration-300 ease-in-out
          ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="
          px-5 pt-2 pb-6 space-y-1
          bg-[#06010f]/80 backdrop-blur-2xl
          border-t border-white/[0.06]
        ">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
                ${active(to)
                  ? "text-white bg-white/[0.07]"
                  : "text-white/45 hover:text-white hover:bg-white/[0.04]"}
              `}
            >
              <span
                aria-hidden="true"
                className={`
                  flex-shrink-0 w-1 h-4 rounded-full
                  bg-gradient-to-b from-emerald-400 to-teal-500
                  transition-opacity duration-200
                  ${active(to) ? "opacity-100" : "opacity-0"}
                `}
              />
              {label}
            </Link>
          ))}

          {/* Mobile auth buttons */}
          <div className="pt-3 grid grid-cols-2 gap-2">
            <Link
              to="/login"
              className="
                text-center py-2.5 rounded-xl text-sm font-medium
                text-white/55 border border-white/10
                hover:border-white/25 hover:text-white hover:bg-white/[0.05]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400
              "
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="
                text-center py-2.5 rounded-xl text-sm font-semibold
                text-[#06010f]
                bg-gradient-to-r from-emerald-400 to-teal-400
                hover:from-emerald-300 hover:to-teal-300
                shadow-[0_0_16px_rgba(52,211,153,0.2)]
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
              "
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}