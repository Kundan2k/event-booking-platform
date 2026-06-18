import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const EVENT_TYPES = [
  { value: "birthday",    label: "🎂 Birthday"        },
  { value: "wedding",     label: "👰 Wedding"          },
  { value: "anniversary", label: "💍 Anniversary"      },
  { value: "farewell",    label: "🎓 Farewell"         },
  { value: "corporate",   label: "🏢 Corporate Event"  },
  { value: "baby-shower", label: "👶 Baby Shower"      },
];

const PACKAGES = [
  { value: "basic",   label: "Basic",   price: 5999,  desc: "Up to 50 guests · 2 hrs"    },
  { value: "premium", label: "Premium", price: 14999, desc: "Up to 150 guests · 4 hrs"   },
  { value: "luxury",  label: "Luxury",  price: 34999, desc: "Up to 400 guests · Full day" },
];

const LOCATIONS = [
  "The Grand Ballroom, Mumbai",
  "Rosewood Garden, Delhi",
  "Skyline Terrace, Bengaluru",
  "Pearl Convention Centre, Chennai",
  "Blue Lotus Resort, Pune",
  "The Heritage Hall, Hyderabad",
  "Other / Custom Venue",
];

const WHY = [
  { icon: "🔒", title: "Secure Payments",  desc: "Bank-grade 256-bit SSL encryption on every transaction."   },
  { icon: "🎧", title: "24 / 7 Support",   desc: "Our event specialists are always a message or call away."  },
  { icon: "✅", title: "Verified Venues",  desc: "Every venue is background-checked and quality-rated."      },
  { icon: "↩️", title: "Free Cancellation",desc: "Cancel up to 48 hours before with zero charges."           },
];

const today = new Date().toISOString().split("T")[0];
const fmt   = (n) => "₹" + Number(n).toLocaleString("en-IN");

/* ─── Sub-components ───────────────────────────────────────────────────────── */
function Label({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-white/45 tracking-widest uppercase mb-2">
      {children}{required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
  );
}

function ErrorMsg({ msg }) {
  return msg ? (
    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1" role="alert">
      <span aria-hidden="true">⚠</span>{msg}
    </p>
  ) : null;
}

function inputCls(err) {
  return `w-full px-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20
    focus:outline-none focus:ring-1 transition-all duration-200
    ${err ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
           : "border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"}`;
}

/* ─── Success Modal ────────────────────────────────────────────────────────── */
function SuccessModal({ data, onClose }) {
  const pkg = PACKAGES.find(p => p.value === data.package) || PACKAGES[1];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)"}}>
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-[#110222] border border-white/12 shadow-2xl shadow-violet-900/40">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-violet-600/10 to-transparent pointer-events-none" />

        <div className="relative px-8 pt-10 pb-8 text-center">
          {/* Bouncing icon */}
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl animate-bounce shadow-2xl shadow-violet-500/40"
            style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",animationDuration:"2s"}}>
            🎊
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-1.5">Booking Confirmed!</h2>
          <p className="text-sm text-white/45 mb-7">
            We've received your request. Our team will reach out within 2 hours.
          </p>

          {/* Summary */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 mb-7 text-left space-y-3">
            {[
              { l: "Name",     v: data.name },
              { l: "Email",    v: data.email },
              { l: "Event",    v: EVENT_TYPES.find(e=>e.value===data.eventType)?.label || data.eventType },
              { l: "Package",  v: `${pkg.label} — ${fmt(pkg.price)}` },
              { l: "Date",     v: data.date },
              { l: "Guests",   v: `${data.guests} people` },
              { l: "Location", v: data.location },
            ].map(({l,v}) => (
              <div key={l} className="flex justify-between gap-4 text-sm">
                <span className="text-white/30 flex-shrink-0">{l}</span>
                <span className="text-white/75 font-medium text-right">{v}</span>
              </div>
            ))}
          </div>

          <button onClick={onClose} className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.4)"}}>
            Done 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function BookingForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", eventType: "", package: "premium",
    date: "", guests: 50, location: "", notes: "",
  });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pkg = PACKAGES.find(p => p.value === form.package) || PACKAGES[1];
  const eventLabel = EVENT_TYPES.find(e => e.value === form.eventType)?.label || "—";

  /* Helpers */
  const set = (field) => (e) => {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                              e.name      = "Full name is required.";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email   = "Valid email is required.";
    if (!form.phone || !/^\+?[\d\s\-]{7,15}$/.test(form.phone)) e.phone = "Valid phone number required.";
    if (!form.eventType)                                e.eventType = "Please select an event type.";
    if (!form.date)                                     e.date      = "Please select a date.";
    if (!form.location)                                 e.location  = "Please select a venue.";
    if (!form.guests || form.guests < 1)                e.guests    = "Guest count must be at least 1.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2000);
  };

  /* Scroll to first error */
  useEffect(() => {
    const first = Object.keys(errors)[0];
    if (first) document.getElementById(first)?.focus();
  }, [errors]);

  return (
    <>
      {success && <SuccessModal data={form} onClose={() => setSuccess(false)} />}

      <div className="min-h-screen bg-[#0d0118] relative overflow-hidden">

        {/* Ambient bg */}
        <div aria-hidden="true" className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-violet-700/15 blur-[130px] pointer-events-none" />
        <div aria-hidden="true" className="absolute top-1/2 -right-40 w-[600px] h-[500px] rounded-full bg-pink-700/10 blur-[130px] pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"32px 32px"}} />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        {/* Page header */}
        <div className="relative pt-[70px]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Secure Booking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight">
              Book Your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Dream Event
              </span>
            </h1>
            <p className="text-base text-white/40 max-w-lg mx-auto">
              Fill in your details and our team will confirm your booking within 2 hours.
            </p>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid lg:grid-cols-3 gap-7 items-start">

              {/* ── Left: Form ─────────────────────────────────────────── */}
              <div className="lg:col-span-2 space-y-6">

                {/* Personal info */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
                  <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>1</span>
                    Personal Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">

                    {/* Full name */}
                    <div className="sm:col-span-2">
                      <Label htmlFor="name" required>Full Name</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <input id="name" type="text" value={form.name} onChange={set("name")} placeholder="Rahul Sharma" autoComplete="name"
                          className={`${inputCls(errors.name)} pl-10`} />
                      </div>
                      <ErrorMsg msg={errors.name} />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email" required>Email Address</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </div>
                        <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email"
                          className={`${inputCls(errors.email)} pl-10`} />
                      </div>
                      <ErrorMsg msg={errors.email} />
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" required>Phone Number</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .97h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                        </div>
                        <input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" autoComplete="tel"
                          className={`${inputCls(errors.phone)} pl-10`} />
                      </div>
                      <ErrorMsg msg={errors.phone} />
                    </div>
                  </div>
                </div>

                {/* Event details */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
                  <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>2</span>
                    Event Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">

                    {/* Event type */}
                    <div>
                      <Label htmlFor="eventType" required>Event Type</Label>
                      <select id="eventType" value={form.eventType} onChange={set("eventType")}
                        className={`${inputCls(errors.eventType)} appearance-none`}>
                        <option value="" disabled className="bg-[#0d0118]">Select event type</option>
                        {EVENT_TYPES.map(e=><option key={e.value} value={e.value} className="bg-[#0d0118]">{e.label}</option>)}
                      </select>
                      <ErrorMsg msg={errors.eventType} />
                    </div>

                    {/* Event date */}
                    <div>
                      <Label htmlFor="date" required>Event Date</Label>
                      <input id="date" type="date" min={today} value={form.date} onChange={set("date")}
                        className={`${inputCls(errors.date)} [color-scheme:dark]`} />
                      <ErrorMsg msg={errors.date} />
                    </div>

                    {/* Guests */}
                    <div>
                      <Label htmlFor="guests" required>Number of Guests</Label>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={()=>setForm(p=>({...p,guests:Math.max(1,p.guests-10)}))}
                          className="w-10 h-[46px] flex-shrink-0 rounded-xl bg-white/6 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-xl font-bold flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">−</button>
                        <input id="guests" type="number" min="1" max="2000" value={form.guests} onChange={set("guests")}
                          className={`${inputCls(errors.guests)} text-center flex-1`} />
                        <button type="button" onClick={()=>setForm(p=>({...p,guests:Math.min(2000,p.guests+10)}))}
                          className="w-10 h-[46px] flex-shrink-0 rounded-xl bg-white/6 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-xl font-bold flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">+</button>
                      </div>
                      <ErrorMsg msg={errors.guests} />
                    </div>

                    {/* Location */}
                    <div>
                      <Label htmlFor="location" required>Event Location</Label>
                      <select id="location" value={form.location} onChange={set("location")}
                        className={`${inputCls(errors.location)} appearance-none`}>
                        <option value="" disabled className="bg-[#0d0118]">Select a venue</option>
                        {LOCATIONS.map(l=><option key={l} value={l} className="bg-[#0d0118]">{l}</option>)}
                      </select>
                      <ErrorMsg msg={errors.location} />
                    </div>
                  </div>
                </div>

                {/* Package selection */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
                  <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>3</span>
                    Package Selection
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {PACKAGES.map(p=>{
                      const active = form.package === p.value;
                      const accents = {
                        basic:   ["#fb7185","#f43f5e"],
                        premium: ["#a78bfa","#ec4899"],
                        luxury:  ["#fbbf24","#f59e0b"],
                      };
                      const [a,b] = accents[p.value];
                      return (
                        <button key={p.value} type="button" onClick={()=>setForm(prev=>({...prev,package:p.value}))}
                          className={`relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                            active ? "shadow-xl" : "border-white/8 hover:border-white/20 bg-white/[0.02]"}`}
                          style={active?{border:`1px solid ${a}50`,background:`linear-gradient(135deg,${a}15,${b}08)`,boxShadow:`0 8px 32px ${a}20`}:{}}>
                          {p.value==="premium"&&<span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase text-white whitespace-nowrap"
                            style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>Most Popular</span>}
                          <p className="text-base font-bold text-white mb-1">{p.label}</p>
                          <p className="text-xl font-extrabold mb-1" style={{background:`linear-gradient(to right,${a},${b})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmt(p.price)}</p>
                          <p className="text-[11px] text-white/35">{p.desc}</p>
                          {active&&(
                            <div className="mt-3 w-5 h-5 rounded-full flex items-center justify-center" style={{background:`linear-gradient(135deg,${a},${b})`}}>
                              <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true"><polyline points="2,6 5,9 10,3"/></svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special requirements */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
                  <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>4</span>
                    Special Requirements
                  </h2>
                  <Label htmlFor="notes">Any special requests or notes?</Label>
                  <textarea id="notes" rows={4} value={form.notes} onChange={set("notes")}
                    placeholder="Theme preferences, dietary requirements, accessibility needs, decoration ideas..."
                    className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 resize-none" />
                  <p className="mt-2 text-xs text-white/20 text-right">{form.notes.length} / 500</p>
                </div>

                {/* Why book with us */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
                  <h2 className="text-base font-bold text-white mb-5">Why Book With Us?</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {WHY.map(({icon,title,desc})=>(
                      <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/6 hover:border-white/15 transition-all duration-200">
                        <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-white/80 mb-0.5">{title}</p>
                          <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="relative overflow-hidden group w-full py-4 rounded-2xl text-base font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 28px rgba(124,58,237,0.45)"}}>
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                      </svg>
                      Confirming your booking…
                    </span>
                  ) : `Confirm Booking · ${fmt(pkg.price)} 🎉`}
                </button>
              </div>

              {/* ── Right: Summary card ─────────────────────────────── */}
              <div className="lg:sticky lg:top-24 self-start space-y-4">

                {/* Summary */}
                <div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/30">
                  <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                  {/* Header */}
                  <div className="px-6 py-5 border-b border-white/8">
                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Booking Summary</p>
                    <p className="text-base font-bold text-white">Review your selection</p>
                  </div>

                  <div className="px-6 py-5 space-y-4">
                    {/* Event type */}
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.25)"}}>
                      <span className="text-2xl" aria-hidden="true">
                        {EVENT_TYPES.find(e=>e.value===form.eventType)?.label.split(" ")[0] || "🎉"}
                      </span>
                      <div>
                        <p className="text-xs text-white/35 font-medium">Selected Event</p>
                        <p className="text-sm font-bold text-white">{eventLabel !== "—" ? eventLabel.replace(/^.+ /,"") : "Not selected"}</p>
                      </div>
                    </div>

                    {/* Package */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8">
                      <span className="text-2xl" aria-hidden="true">
                        {pkg.value==="basic"?"🌸":pkg.value==="premium"?"🎊":"👑"}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs text-white/35 font-medium">Package</p>
                        <p className="text-sm font-bold text-white">{pkg.label}</p>
                      </div>
                      <p className="text-sm font-extrabold" style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmt(pkg.price)}</p>
                    </div>

                    {/* Details grid */}
                    <div className="space-y-2.5">
                      {[
                        {icon:"📅",label:"Event Date",  val:form.date     || "Not selected"},
                        {icon:"👥",label:"Guests",      val:`${form.guests} people`},
                        {icon:"📍",label:"Location",    val:form.location  || "Not selected"},
                      ].map(({icon,label,val})=>(
                        <div key={label} className="flex items-start justify-between gap-3 text-sm">
                          <span className="text-white/30 flex items-center gap-1.5 flex-shrink-0"><span aria-hidden="true">{icon}</span>{label}</span>
                          <span className={`text-right text-xs leading-snug font-medium ${val.includes("Not selected")?"text-white/20 italic":"text-white/65"}`}>{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price breakdown */}
                    <div className="pt-3 border-t border-white/8 space-y-2 text-sm">
                      <div className="flex justify-between text-white/40"><span>Package price</span><span>{fmt(pkg.price)}</span></div>
                      <div className="flex justify-between text-white/40"><span>Service fee (5%)</span><span>{fmt(Math.round(pkg.price*0.05))}</span></div>
                      <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/8">
                        <span>Estimated Total</span>
                        <span style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                          {fmt(pkg.price + Math.round(pkg.price*0.05))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-5 space-y-3">
                  {[
                    {icon:"🔒",title:"Secure Payment",  sub:"256-bit SSL encrypted"},
                    {icon:"🎧",title:"24/7 Support",    sub:"Always here to help"},
                    {icon:"✅",title:"Verified Venues", sub:"Quality guaranteed"},
                  ].map(({icon,title,sub})=>(
                    <div key={title} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-lg bg-white/6 border border-white/10">{icon}</div>
                      <div>
                        <p className="text-xs font-bold text-white/70">{title}</p>
                        <p className="text-[11px] text-white/30">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Need help */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-5 text-center">
                  <p className="text-sm font-semibold text-white/60 mb-1">Need help deciding?</p>
                  <p className="text-xs text-white/30 mb-4">Talk to our event specialists before booking.</p>
                  <a href="tel:+919876543210"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white border border-white/12 hover:border-white/28 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-violet-400" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .97h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    Call Us Now
                  </a>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}