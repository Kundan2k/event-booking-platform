import { Link } from "react-router-dom";

const COMPANY = [
  { label: "About Us",   to: "/about"   },
  { label: "Our Team",   to: "/team"    },
  { label: "Careers",    to: "/careers" },
  { label: "Blog",       to: "/blog"    },
  { label: "Press Kit",  to: "/press"   },
];

const SERVICES = [
  { label: "Birthday Events",  to: "/events?category=birthday"   },
  { label: "Wedding Planning", to: "/events?category=wedding"    },
  { label: "Anniversaries",    to: "/events?category=anniversary"},
  { label: "Corporate Events", to: "/events?category=corporate"  },
  { label: "Baby Showers",     to: "/events?category=baby-shower"},
  { label: "View Packages",    to: "/packages"                   },
];

const SOCIAL = [
  {
    label: "Instagram",
    href:  "https://instagram.com",
    from:  "hover:from-pink-500",
    to:    "hover:to-rose-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href:  "https://facebook.com",
    from:  "hover:from-blue-500",
    to:    "hover:to-indigo-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href:  "https://twitter.com",
    from:  "hover:from-sky-400",
    to:    "hover:to-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href:  "https://youtube.com",
    from:  "hover:from-red-500",
    to:    "hover:to-rose-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com",
    from:  "hover:from-blue-600",
    to:    "hover:to-sky-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const CONTACT = [
  {
    href: "tel:+919876543210",
    label: "+91 98765 43210",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0 text-violet-400">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .97h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    href: "mailto:hello@eventora.in",
    label: "hello@eventora.in",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0 text-fuchsia-400">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    href: "https://maps.google.com",
    label: "Bandra West, Mumbai — 400050",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0 text-pink-400 mt-0.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
];

function FooterLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-white/40 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
      >
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0d0118] border-t border-white/8">

      {/* Top glow accent */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">

            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg"
              aria-label="Eventora home"
            >
              <div className="
                w-9 h-9 rounded-xl flex items-center justify-center
                bg-gradient-to-br from-violet-600 to-pink-500
                shadow-lg shadow-violet-500/30
                group-hover:shadow-violet-500/50
                transition-shadow duration-300
              ">
                <span className="text-lg" aria-hidden="true">🎉</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Event<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">ora</span>
              </span>
            </Link>

            <p className="text-sm text-white/35 leading-relaxed mb-6 max-w-xs">
              Premium event experiences crafted for every occasion. From intimate birthdays to grand weddings — we make every celebration unforgettable.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2" role="list" aria-label="Social media links">
              {SOCIAL.map(({ label, href, from, to, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  role="listitem"
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    bg-white/5 border border-white/10
                    hover:border-transparent
                    hover:bg-gradient-to-br ${from} ${to}
                    text-white/45 hover:text-white
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                  `}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-white/25 uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY.map((l) => <FooterLink key={l.to} {...l} />)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-white/25 uppercase mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((l) => <FooterLink key={l.to} {...l} />)}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-white/25 uppercase mb-5">
              Contact
            </h3>
            <ul className="space-y-4 mb-7">
              {CONTACT.map(({ href, label, icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-2.5 text-sm text-white/40 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-bold tracking-widest text-white/25 uppercase mb-3">
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="
                    flex-1 min-w-0 px-3 py-2 rounded-lg text-sm
                    bg-white/6 border border-white/10
                    text-white placeholder:text-white/20
                    focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30
                    transition-colors duration-200
                  "
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="
                    px-3 py-2 rounded-lg text-sm font-bold text-white flex-shrink-0
                    bg-gradient-to-r from-violet-600 to-pink-500
                    hover:from-violet-500 hover:to-pink-400
                    shadow-lg shadow-violet-500/20
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400
                  "
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 text-center sm:text-left">
            © {year} Eventora. All rights reserved. Made with 🎉 in India.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {[
              { label: "Privacy Policy",  to: "/privacy"  },
              { label: "Terms of Service", to: "/terms"   },
              { label: "Cookie Policy",   to: "/cookies"  },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-xs text-white/20 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}