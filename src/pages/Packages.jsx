import { useState } from "react";
import { Link } from "react-router-dom";

const TIERS = [
  {
    id:          "basic",
    name:        "Basic",
    tagline:     "Perfect for small celebrations",
    monthly:     "₹5,999",
    annual:      "₹4,799",
    emoji:       "🌸",
    badge:       null,
    featured:    false,
    accentFrom:  "#fb7185",
    accentTo:    "#f43f5e",
    borderIdle:  "border-white/8",
    borderHover: "hover:border-rose-500/40",
    glowHover:   "hover:shadow-rose-500/10",
    features: [
      { text: "Venue for up to 50 guests",       included: true  },
      { text: "Basic floral decoration",          included: true  },
      { text: "2-hour event slot",               included: true  },
      { text: "Welcome drink station",            included: true  },
      { text: "On-site event coordinator",        included: true  },
      { text: "Photography & videography",        included: false },
      { text: "Live music or DJ",                included: false },
      { text: "Catering & buffet setup",          included: false },
      { text: "Dedicated 3-person team",          included: false },
    ],
  },
  {
    id:          "premium",
    name:        "Premium",
    tagline:     "Our most loved package",
    monthly:     "₹14,999",
    annual:      "₹11,999",
    emoji:       "🎊",
    badge:       "Most Popular",
    featured:    true,
    accentFrom:  "#a78bfa",
    accentTo:    "#ec4899",
    borderIdle:  "border-violet-500/45",
    borderHover: "hover:border-violet-400/70",
    glowHover:   "hover:shadow-violet-500/20",
    features: [
      { text: "Venue for up to 150 guests",       included: true },
      { text: "Premium themed decoration",         included: true },
      { text: "4-hour event slot",                included: true },
      { text: "Welcome drink station",             included: true },
      { text: "Dedicated event manager",           included: true },
      { text: "Photography & videography",         included: true },
      { text: "Live music or DJ",                 included: true },
      { text: "Catering & buffet setup",           included: true },
      { text: "Dedicated 3-person team",           included: false },
    ],
  },
  {
    id:          "luxury",
    name:        "Luxury",
    tagline:     "Go all out, no compromises",
    monthly:     "₹34,999",
    annual:      "₹27,999",
    emoji:       "👑",
    badge:       "Premium",
    featured:    false,
    accentFrom:  "#fbbf24",
    accentTo:    "#f59e0b",
    borderIdle:  "border-white/8",
    borderHover: "hover:border-amber-500/40",
    glowHover:   "hover:shadow-amber-500/10",
    features: [
      { text: "Venue for up to 400 guests",       included: true },
      { text: "Luxury 5-star decoration",          included: true },
      { text: "Full-day event slot",               included: true },
      { text: "Welcome drink station",             included: true },
      { text: "Dedicated event manager",           included: true },
      { text: "Photography & videography",         included: true },
      { text: "Live music or DJ",                 included: true },
      { text: "Gourmet catering — 5 courses",     included: true },
      { text: "Dedicated 3-person team",           included: true },
    ],
  },
];

const FAQS = [
  {
    q: "Can I customise a package?",
    a: "Absolutely. Every package is a starting point. Our event specialists work with you to tailor décor, catering, timing, and extras to your exact vision.",
  },
  {
    q: "Is there a cancellation policy?",
    a: "Yes — you can cancel free of charge up to 48 hours before your event. After that, a 20% fee applies. Full details are in your booking confirmation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, credit/debit cards, net banking, and EMI options. All transactions are secured with bank-grade encryption.",
  },
  {
    q: "Do packages include venue booking?",
    a: "Yes. Venue access is included in all tiers. Premium and Luxury packages unlock a wider selection of premium and 5-star venues.",
  },
];

function FeatureRow({ text, included }) {
  return (
    <li className="flex items-start gap-3 text-sm">
      {included ? (
        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-sm" aria-hidden="true">✓</span>
      ) : (
        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white/20 bg-white/5 border border-white/8" aria-hidden="true">✕</span>
      )}
      <span className={included ? "text-white/65" : "text-white/20 line-through"}>{text}</span>
    </li>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/15">
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        <span className="text-sm font-semibold text-white/80">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/40 text-xs transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="px-6 pb-5 text-sm text-white/40 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Packages() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0118]">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="relative pt-[70px] overflow-hidden">
        <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[100px]" />
        <div aria-hidden="true" className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/10 blur-[100px]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Simple Pricing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Package
            </span>
          </h1>
          <p className="max-w-lg mx-auto text-base text-white/45 leading-relaxed mb-10">
            Transparent pricing, no hidden fees. Every package includes a dedicated event coordinator.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 px-2 py-2 rounded-full bg-white/6 border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${!annual ? "bg-white/12 text-white" : "text-white/40 hover:text-white"}`}
            >
              One-time
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${annual ? "bg-white/12 text-white" : "text-white/40 hover:text-white"}`}
            >
              Annual
              <span className="ml-2 text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* ── Pricing cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`
                group relative flex flex-col rounded-2xl overflow-hidden
                border ${tier.borderIdle} ${tier.borderHover}
                bg-white/[0.03] hover:bg-white/[0.05]
                hover:-translate-y-2 hover:shadow-2xl ${tier.glowHover}
                backdrop-blur-sm
                transition-all duration-300 ease-out
                ${tier.featured ? "ring-1 ring-violet-500/40 shadow-xl shadow-violet-500/15 md:-mt-4 md:mb-4" : ""}
              `}
            >
              {/* Top shimmer */}
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              {/* Badge */}
              {tier.badge && (
                <div className="absolute top-5 right-5 z-10">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${tier.featured ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30" : "bg-white/10 text-white/60 border border-white/15"}`}>
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${tier.accentFrom}, ${tier.accentTo})` }}
                  >
                    {tier.emoji}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{tier.name}</h2>
                    <p className="text-xs text-white/35">{tier.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {annual ? tier.annual : tier.monthly}
                    </span>
                    <span className="text-sm text-white/30 mb-1.5">/ event</span>
                  </div>
                  {annual && (
                    <p className="text-xs text-emerald-400 mt-1 font-medium">
                      ✓ You save {tier.id === "basic" ? "₹1,200" : tier.id === "premium" ? "₹3,000" : "₹7,000"} annually
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px w-full mb-6 opacity-15" style={{ background: `linear-gradient(to right, ${tier.accentFrom}, ${tier.accentTo})` }} />

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-7">
                  {tier.features.map((f) => (
                    <FeatureRow key={f.text} {...f} />
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={`/booking?package=${tier.id}`}
                  className={`
                    relative overflow-hidden group/btn
                    w-full text-center py-3.5 rounded-xl text-sm font-bold tracking-wide
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400
                    ${tier.featured
                      ? "text-white shadow-lg hover:opacity-90"
                      : "border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/6"}
                  `}
                  style={tier.featured ? { background: `linear-gradient(to right, #7c3aed, #ec4899)`, boxShadow: "0 0 20px rgba(124,58,237,0.35)" } : {}}
                >
                  {tier.featured && (
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                  )}
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Comparison note ───────────────────────────────────────── */}
        <div className="mb-16 p-6 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="text-3xl flex-shrink-0" aria-hidden="true">💬</span>
          <div>
            <p className="text-sm font-semibold text-white/70 mb-0.5">Need something custom?</p>
            <p className="text-sm text-white/35">Our event specialists build tailored packages for large or unique events.</p>
          </div>
          <Link
            to="/contact"
            className="ml-auto flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 whitespace-nowrap"
          >
            Talk to us →
          </Link>
        </div>

        {/* ── Trust strip ───────────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-20">
          {[
            { icon: "🔒", text: "Secure payments" },
            { icon: "↩️", text: "Free cancellation in 48 hrs" },
            { icon: "🎧", text: "24 / 7 support" },
            { icon: "✅", text: "Verified venues only" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-white/30">
              <span aria-hidden="true">{icon}</span>{text}
            </div>
          ))}
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => <FAQ key={faq.q} {...faq} />)}
          </div>
        </div>
      </div>
    </div>
  );
}