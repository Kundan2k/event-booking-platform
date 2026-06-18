import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

/* ─── FAQ Data ─────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    id: 1,
    category: "Booking",
    icon: "📅",
    question: "How do I book an event?",
    answer: "Booking is simple! Browse our Events or Packages page, choose what suits you, click 'Book Now', and fill in your event details — date, venue, guest count, and any special requirements. Our team confirms your booking within 2 hours and you'll receive a full confirmation email.",
  },
  {
    id: 2,
    category: "Packages",
    icon: "📦",
    question: "Can I customise a package?",
    answer: "Absolutely. Every package is a starting point. Our event specialists work with you to tailor décor themes, catering menus, entertainment options, and timing to match your exact vision and budget. Just mention your requirements in the Special Notes field when booking, or contact us directly.",
  },
  {
    id: 3,
    category: "Payments",
    icon: "💳",
    question: "What payment methods are accepted?",
    answer: "We accept UPI (PhonePe, GPay, Paytm), credit and debit cards (Visa, Mastercard, RuPay), net banking, and EMI options on select cards. All transactions are secured with 256-bit SSL encryption. You can also pay in two instalments — 30% to confirm and the rest 7 days before the event.",
  },
  {
    id: 4,
    category: "Booking",
    icon: "↩️",
    question: "Can I cancel my booking?",
    answer: "Yes. Cancellations made 48+ hours before the event are completely free. Cancellations within 24–48 hours attract a 20% fee. Cancellations under 24 hours before the event are non-refundable. For force majeure situations (illness, emergencies), we offer rescheduling at no charge — just contact our support team.",
  },
  {
    id: 5,
    category: "Services",
    icon: "🌸",
    question: "Do you provide decorations?",
    answer: "Yes! Décor is included in all packages, ranging from basic balloon setups in our Starter plan to full 5-star floral draping in our Luxury package. You can also choose a theme (Bollywood, Pastel Garden, Royal, Rustic, etc.) and we'll bring your vision to life. Décor upgrade add-ons are available at checkout.",
  },
  {
    id: 6,
    category: "Trust",
    icon: "✅",
    question: "Are vendors and venues verified?",
    answer: "Every vendor and venue on Eventora goes through a strict onboarding process — including background checks, site inspections, licence verification, and at least 10 customer reviews before going live. We re-audit partners quarterly. You'll see a Verified badge on every listing so you always know you're in safe hands.",
  },
  {
    id: 7,
    category: "Support",
    icon: "🎧",
    question: "Is there customer support available?",
    answer: "Our event specialists are available 24/7 via live chat, email (hello@eventora.in), and phone (+91 98765 43210). For urgent on-day issues, every booking includes a dedicated on-site coordinator. We also have a Help Centre with step-by-step guides for common questions.",
  },
  {
    id: 8,
    category: "Booking",
    icon: "📍",
    question: "Can I book events outside my city?",
    answer: "Yes! We currently operate in Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Jaipur, and Chandigarh — with 150+ verified venues across these cities. If you're planning a destination event, our team can coordinate logistics, accommodation, and vendors for you.",
  },
  {
    id: 9,
    category: "Planning",
    icon: "⏰",
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2–3 weeks in advance for birthday and farewell events, 1–2 months for anniversaries and corporate events, and 3–6 months for weddings. Peak season (October–February) venues fill quickly, so earlier is always better. Last-minute bookings within 48 hours may be possible — contact us to check availability.",
  },
  {
    id: 10,
    category: "Payments",
    icon: "🧾",
    question: "Will I receive an invoice after booking?",
    answer: "Yes. You'll receive a detailed invoice by email immediately after booking confirmation. The invoice includes a full cost breakdown — package price, add-ons, service fee, and any applied discounts. A GST-compliant tax invoice is issued on request for corporate bookings. You can also download invoices anytime from your Dashboard.",
  },
];

const CATEGORIES = ["All", "Booking", "Packages", "Payments", "Services", "Trust", "Support", "Planning"];

/* ─── FAQItem ──────────────────────────────────────────────────────────────── */
function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <div
      className={`
        group relative rounded-2xl overflow-hidden border transition-all duration-300 ease-out
        ${isOpen
          ? "border-violet-500/40 shadow-xl shadow-violet-500/10"
          : "border-white/8 hover:border-white/18 hover:shadow-lg"}
      `}
      style={isOpen ? {background:"linear-gradient(135deg,rgba(124,58,237,0.08),rgba(236,72,153,0.05))"} : {background:"rgba(255,255,255,0.025)"}}
    >
      {/* Top shimmer */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Left accent bar */}
      <div
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        style={{background:"linear-gradient(to bottom,#7c3aed,#ec4899)"}}
      />

      {/* Question button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-inset rounded-2xl"
      >
        {/* Index + icon */}
        <div className="flex-shrink-0 flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 transition-all duration-300"
            style={isOpen
              ? {background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 12px rgba(124,58,237,0.4)"}
              : {background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"}}
          >
            {String(index + 1).padStart(2,"0")}
          </span>
          <span className="text-lg" aria-hidden="true">{faq.icon}</span>
        </div>

        {/* Question text */}
        <span className={`flex-1 text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
          {faq.question}
        </span>

        {/* Toggle icon */}
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm border transition-all duration-300 ${
            isOpen
              ? "border-transparent rotate-45 text-white"
              : "border-white/15 text-white/40 group-hover:border-white/30 group-hover:text-white/70"
          }`}
          style={isOpen ? {background:"linear-gradient(135deg,#7c3aed,#ec4899)"} : {}}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* Answer — animated */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          opacity:   isOpen ? 1        : 0,
        }}
      >
        <div className="px-6 pb-5 pl-[72px]">
          <div className="h-px bg-white/6 mb-4" aria-hidden="true" />
          <p className="text-sm text-white/55 leading-relaxed">{faq.answer}</p>
          {/* Category tag */}
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-violet-400 bg-violet-500/10 border border-violet-500/20">
              {faq.icon} {faq.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ ──────────────────────────────────────────────────────────────────── */
export default function FAQ() {
  const [openId,   setOpenId]   = useState(null);
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");

  const toggle = id => setOpenId(prev => prev === id ? null : id);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return FAQS.filter(f => {
      const matchCat  = category === "All" || f.category === category;
      const matchSearch = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <section className="relative bg-[#0d0118] py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-violet-700/8 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-pink-700/8 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-fuchsia-700/5 rounded-full blur-3xl pointer-events-none" />

      {/* Separators */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-3xl mx-auto">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Need Help?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-base text-white/45 leading-relaxed">
            Everything you need to know about booking events with Eventora.
          </p>
        </div>

        {/* ── Search bar ───────────────────────────────────────────── */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/25" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="search"
            value={search}
            onChange={e => { setSearch(e.target.value); setOpenId(null); }}
            placeholder="Search questions…"
            aria-label="Search FAQs"
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/6 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 backdrop-blur-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute inset-y-0 right-4 flex items-center text-white/25 hover:text-white/60 transition-colors duration-200 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* ── Category filters ─────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => { setCategory(c); setOpenId(null); }}
              aria-pressed={category === c}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                category === c
                  ? "text-white border-transparent shadow-lg shadow-violet-500/25"
                  : "text-white/40 border-white/10 bg-white/[0.03] hover:text-white/70 hover:border-white/20"
              }`}
              style={category === c ? {background:"linear-gradient(to right,#7c3aed,#ec4899)"} : {}}
            >
              {c}
            </button>
          ))}
        </div>

        {/* ── Results count ────────────────────────────────────────── */}
        {(search || category !== "All") && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-white/30">
              Showing <span className="text-white/60 font-semibold">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
              {search && <span> for "<span className="text-violet-400">{search}</span>"</span>}
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setOpenId(null); }}
              className="text-xs text-white/30 hover:text-white border border-white/8 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              Clear
            </button>
          </div>
        )}

        {/* ── Accordion list ───────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="space-y-3 mb-14">
            {filtered.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={FAQS.findIndex(f => f.id === faq.id)}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center mb-14">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4">🔍</div>
            <h3 className="text-base font-bold text-white mb-1.5">No results found</h3>
            <p className="text-sm text-white/35 mb-5">Try a different search term or category.</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}
            >
              Show all FAQs
            </button>
          </div>
        )}

        {/* ── Still have questions CTA ─────────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div aria-hidden="true" className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(236,72,153,0.1))"}} />
          <div aria-hidden="true" className="absolute inset-0 border border-white/10 rounded-3xl" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

          {/* Orb */}
          <div aria-hidden="true" className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-600/15 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-pink-600/15 blur-3xl" />

          <div className="relative px-8 py-10 text-center">
            <div className="text-4xl mb-4" aria-hidden="true">💬</div>
            <h3 className="text-2xl font-extrabold text-white mb-2">Still have questions?</h3>
            <p className="text-sm text-white/45 leading-relaxed mb-7 max-w-sm mx-auto">
              Our event specialists are available 24/7. Reach out and we'll get back to you within 2 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Contact support */}
              <Link
                to="/contact"
                className="relative overflow-hidden group w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.4)"}}
              >
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                🎧 Contact Support
              </Link>

              {/* Email support */}
              <a
                href="mailto:hello@eventora.in"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white/60 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/6 transition-all duration-200 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              >
                📧 Email Us
              </a>
            </div>

            {/* Quick contact info */}
            <div className="flex flex-wrap justify-center gap-6 mt-7 pt-6 border-t border-white/8">
              {[
                { icon:"📞", text:"+91 98765 43210",  href:"tel:+919876543210"      },
                { icon:"📧", text:"hello@eventora.in", href:"mailto:hello@eventora.in"},
                { icon:"⏰", text:"Mon–Sat, 9AM–8PM",  href:null                     },
              ].map(({ icon, text, href }) =>
                href ? (
                  <a key={text} href={href} className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors duration-200">
                    <span aria-hidden="true">{icon}</span>{text}
                  </a>
                ) : (
                  <span key={text} className="flex items-center gap-1.5 text-xs text-white/35">
                    <span aria-hidden="true">{icon}</span>{text}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}