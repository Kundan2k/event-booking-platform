import { useState } from "react";
import { Link } from "react-router-dom";

const PACKAGES = [
  { id: "basic",    name: "Birthday Basic",    price: 5999,  emoji: "🎂" },
  { id: "premium",  name: "Birthday Premium",  price: 13999, emoji: "🎉" },
  { id: "anniversary", name: "Anniversary Gold", price: 17999, emoji: "💍" },
  { id: "wedding",  name: "Wedding Silver",    price: 34999, emoji: "👰" },
  { id: "corporate",name: "Corporate Event",   price: 21999, emoji: "🏢" },
  { id: "luxury",   name: "Luxury Grand",      price: 74999, emoji: "👑" },
];

const TIMES = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM",
  "05:00 PM","06:00 PM","07:00 PM","08:00 PM",
];

const VENUES = [
  "The Grand Ballroom, Mumbai",
  "Rosewood Garden, Delhi",
  "Skyline Terrace, Bengaluru",
  "Pearl Convention Centre, Chennai",
  "Blue Lotus Resort, Pune",
  "The Heritage Hall, Hyderabad",
];

const ADDONS = [
  { id: "photo",   label: "Photography & Videography", price: 4999,  emoji: "📸" },
  { id: "dj",     label: "DJ & Live Music",            price: 3999,  emoji: "🎵" },
  { id: "cake",   label: "Custom Cake",                price: 1499,  emoji: "🎂" },
  { id: "decor",  label: "Premium Decoration Upgrade", price: 2999,  emoji: "🌸" },
];

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-white/45 tracking-widest uppercase mb-2">
      {children}
    </label>
  );
}

function FieldWrap({ children, error }) {
  return (
    <div>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
          <span aria-hidden="true">⚠</span>{error}
        </p>
      )}
    </div>
  );
}

const inputCls = (err) =>
  `w-full px-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${
    err ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/30"
        : "border-white/10 focus:border-violet-500/60 focus:ring-violet-500/30"}`;

export default function Booking() {
  const params  = new URLSearchParams(window.location.search);
  const initPkg = PACKAGES.find(p => p.id === params.get("package")) || PACKAGES[1];

  const [pkg,     setPkg]     = useState(initPkg);
  const [date,    setDate]    = useState("");
  const [time,    setTime]    = useState("");
  const [guests,  setGuests]  = useState(50);
  const [venue,   setVenue]   = useState("");
  const [notes,   setNotes]   = useState("");
  const [addons,  setAddons]  = useState([]);
  const [errors,  setErrors]  = useState({});
  const [step,    setStep]    = useState(1); // 1 = form, 2 = confirmed
  const [loading, setLoading] = useState(false);

  const toggleAddon = (id) =>
    setAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const addonTotal  = ADDONS.filter(a => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const serviceFee  = Math.round(pkg.price * 0.05);
  const total       = pkg.price + addonTotal + serviceFee;

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const e = {};
    if (!date)       e.date   = "Please select a date.";
    if (!time)       e.time   = "Please select a time slot.";
    if (!venue)      e.venue  = "Please select a venue.";
    if (guests < 1)  e.guests = "Guest count must be at least 1.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 2000);
  };

  /* ── Confirmation screen ───────────────────────────────────────────── */
  if (step === 2) return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px]" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/15 blur-[120px]" />
      <div className="relative w-full max-w-md text-center">
        <div className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-5xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-2xl shadow-violet-500/40 animate-bounce" style={{ animationDuration: "2s" }}>
          🎊
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-white/45 text-sm mb-8">
          Your <span className="text-violet-400 font-semibold">{pkg.name}</span> event has been booked for{" "}
          <span className="text-pink-400 font-semibold">{date}</span> at{" "}
          <span className="text-fuchsia-400 font-semibold">{time}</span>.
        </p>

        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 mb-8 text-left space-y-3">
          {[
            { label: "Package",    value: `${pkg.emoji} ${pkg.name}` },
            { label: "Venue",      value: venue },
            { label: "Guests",     value: `${guests} people` },
            { label: "Total Paid", value: fmt(total) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-white/35">{label}</span>
              <span className="text-white font-semibold">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="flex-1 py-3 rounded-xl text-sm font-semibold text-white/60 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200 text-center">
            Back to Home
          </Link>
          <Link to="/events" className="flex-1 py-3 rounded-xl text-sm font-bold text-white text-center transition-all duration-200" style={{ background: "linear-gradient(to right,#7c3aed,#ec4899)", boxShadow: "0 0 20px rgba(124,58,237,0.35)" }}>
            Browse Events →
          </Link>
        </div>
      </div>
    </div>
  );

  /* ── Main booking form ─────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0d0118] relative overflow-hidden">

      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/10 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      {/* Page header */}
      <div className="relative pt-[70px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Secure Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Book Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Event
            </span>
          </h1>
          <p className="text-base text-white/40 max-w-md mx-auto">
            Fill in the details below and we'll take care of the rest.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-3 gap-6 items-start">

            {/* ── Left: Form ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Package selector */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6">
                <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">1</span>
                  Choose Package
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PACKAGES.map((p) => (
                    <button
                      key={p.id} type="button"
                      onClick={() => setPkg(p)}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                        pkg.id === p.id
                          ? "border-violet-500/60 bg-violet-500/10 shadow-lg shadow-violet-500/15"
                          : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`}
                    >
                      <span className="text-2xl" aria-hidden="true">{p.emoji}</span>
                      <span className="text-xs font-semibold text-white/70 leading-snug">{p.name}</span>
                      <span className="text-[10px] font-bold text-violet-400">{fmt(p.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Event details */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6">
                <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">2</span>
                  Event Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">

                  {/* Date */}
                  <FieldWrap error={errors.date}>
                    <Label htmlFor="date">Event Date</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      </div>
                      <input
                        id="date" type="date" min={today}
                        value={date} onChange={e => { setDate(e.target.value); if(errors.date) setErrors(p=>({...p,date:""})); }}
                        className={`${inputCls(errors.date)} pl-10 [color-scheme:dark]`}
                      />
                    </div>
                  </FieldWrap>

                  {/* Time */}
                  <FieldWrap error={errors.time}>
                    <Label htmlFor="time">Time Slot</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      </div>
                      <select
                        id="time" value={time}
                        onChange={e => { setTime(e.target.value); if(errors.time) setErrors(p=>({...p,time:""})); }}
                        className={`${inputCls(errors.time)} pl-10 appearance-none`}
                      >
                        <option value="" disabled className="bg-[#0d0118]">Select a time</option>
                        {TIMES.map(t => <option key={t} value={t} className="bg-[#0d0118]">{t}</option>)}
                      </select>
                    </div>
                  </FieldWrap>

                  {/* Guests */}
                  <FieldWrap error={errors.guests}>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setGuests(g => Math.max(1, g - 10))}
                        className="w-10 h-[46px] rounded-xl bg-white/6 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-lg font-bold transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400" aria-label="Decrease guests">−</button>
                      <input
                        id="guests" type="number" min="1" max="2000"
                        value={guests} onChange={e => { setGuests(Number(e.target.value)); if(errors.guests) setErrors(p=>({...p,guests:""})); }}
                        className={`${inputCls(errors.guests)} text-center flex-1`}
                      />
                      <button type="button" onClick={() => setGuests(g => Math.min(2000, g + 10))}
                        className="w-10 h-[46px] rounded-xl bg-white/6 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-lg font-bold transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400" aria-label="Increase guests">+</button>
                    </div>
                  </FieldWrap>

                  {/* Venue */}
                  <FieldWrap error={errors.venue}>
                    <Label htmlFor="venue">Preferred Venue</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                      </div>
                      <select
                        id="venue" value={venue}
                        onChange={e => { setVenue(e.target.value); if(errors.venue) setErrors(p=>({...p,venue:""})); }}
                        className={`${inputCls(errors.venue)} pl-10 appearance-none`}
                      >
                        <option value="" disabled className="bg-[#0d0118]">Select a venue</option>
                        {VENUES.map(v => <option key={v} value={v} className="bg-[#0d0118]">{v}</option>)}
                      </select>
                    </div>
                  </FieldWrap>
                </div>

                {/* Special notes */}
                <div className="mt-4">
                  <Label htmlFor="notes">Special Requests / Notes</Label>
                  <textarea
                    id="notes" rows={4} value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any dietary requirements, theme preferences, special arrangements..."
                    className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Add-ons */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6">
                <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white" aria-hidden="true">3</span>
                  Optional Add-ons
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ADDONS.map(({ id, label, price, emoji }) => {
                    const checked = addons.includes(id);
                    return (
                      <button
                        key={id} type="button"
                        onClick={() => toggleAddon(id)}
                        aria-pressed={checked}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                          checked ? "border-violet-500/50 bg-violet-500/10" : "border-white/8 bg-white/[0.02] hover:border-white/20"}`}
                      >
                        <span className="text-2xl flex-shrink-0" aria-hidden="true">{emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white/75 leading-snug">{label}</p>
                          <p className="text-xs text-violet-400 font-bold mt-0.5">{fmt(price)}</p>
                        </div>
                        <div className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${checked ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 border-transparent" : "border-white/15 bg-white/5"}`}>
                          {checked && <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true"><polyline points="2,6 5,9 10,3" /></svg>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right: Summary card ────────────────────────────────── */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/30">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                {/* Summary header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/8">
                  <h3 className="text-base font-bold text-white mb-1">Booking Summary</h3>
                  <p className="text-xs text-white/35">Review your selections</p>
                </div>

                <div className="px-6 py-5 space-y-4">

                  {/* Selected package */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <span className="text-2xl" aria-hidden="true">{pkg.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-white">{pkg.name}</p>
                      <p className="text-xs text-violet-400 font-semibold">{fmt(pkg.price)}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2.5">
                    {[
                      { icon: "📅", label: "Date",   value: date   || "Not selected" },
                      { icon: "🕐", label: "Time",   value: time   || "Not selected" },
                      { icon: "👥", label: "Guests", value: `${guests} people` },
                      { icon: "📍", label: "Venue",  value: venue  || "Not selected" },
                    ].map(({ icon, label, value }) => (
                      <div key={label} className="flex items-start justify-between gap-2 text-sm">
                        <span className="text-white/35 flex items-center gap-1.5 flex-shrink-0">
                          <span aria-hidden="true">{icon}</span>{label}
                        </span>
                        <span className={`text-right font-medium text-xs leading-snug ${value.includes("Not selected") ? "text-white/20 italic" : "text-white/70"}`}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Add-ons in summary */}
                  {addons.length > 0 && (
                    <div className="pt-1">
                      <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-2">Add-ons</p>
                      {ADDONS.filter(a => addons.includes(a.id)).map(a => (
                        <div key={a.id} className="flex justify-between text-xs text-white/50 mb-1">
                          <span>{a.emoji} {a.label}</span>
                          <span className="font-semibold">{fmt(a.price)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price breakdown */}
                  <div className="pt-3 border-t border-white/8 space-y-2">
                    <div className="flex justify-between text-sm text-white/45">
                      <span>Package</span><span>{fmt(pkg.price)}</span>
                    </div>
                    {addonTotal > 0 && (
                      <div className="flex justify-between text-sm text-white/45">
                        <span>Add-ons</span><span>{fmt(addonTotal)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-white/45">
                      <span>Service fee (5%)</span><span>{fmt(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/8">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">{fmt(total)}</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit" disabled={loading}
                    className="relative overflow-hidden group w-full py-4 rounded-xl text-sm font-bold text-white tracking-wide mt-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(to right,#7c3aed,#ec4899)", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}
                  >
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Confirming…
                      </span>
                    ) : `Confirm Booking · ${fmt(total)}`}
                  </button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    {["🔒 Secure", "↩️ Free cancel", "🎧 24/7 support"].map(t => (
                      <span key={t} className="text-[10px] text-white/25 font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}