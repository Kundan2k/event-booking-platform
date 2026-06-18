import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

/* ─── Static data ─────────────────────────────────────────────────────────── */
const EVENT = {
  title:       "Royal Birthday Celebration",
  category:    "Birthday",
  emoji:       "🎂",
  location:    "The Grand Ballroom, Bandra West, Mumbai",
  rating:      4.9,
  reviews:     312,
  duration:    "4–8 hours",
  capacity:    "20 – 500 guests",
  basePrice:   8999,
  description: `Transform any space into a magical celebration with Eventora's Royal Birthday experience. Our expert event designers craft bespoke themes — from fairytale forests to Bollywood glam — blending premium décor, curated entertainment, and flawless hospitality into one unforgettable evening. Whether you're planning an intimate gathering or a grand 500-person gala, every detail is handled so you can be fully present in the moment.`,
  included: [
    { icon: "🌸", text: "Custom themed floral decoration" },
    { icon: "🎵", text: "Live music or curated DJ set" },
    { icon: "📸", text: "Professional photography & reels" },
    { icon: "🍽️", text: "Buffet or plated catering options" },
    { icon: "🎂", text: "Personalised multi-tier cake" },
    { icon: "💡", text: "Stage, lighting & AV setup" },
  ],
  services: [
    "Dedicated event manager",
    "Venue sourcing & coordination",
    "Invitation design & dispatch",
    "Return gift curation",
    "Post-event cleanup",
    "24 / 7 on-site support",
  ],
};

const PACKAGES = [
  {
    id:       "basic",
    name:     "Basic",
    emoji:    "🌸",
    price:    8999,
    tagline:  "Perfect for intimate parties",
    featured: false,
    accentA:  "#fb7185",
    accentB:  "#f43f5e",
    features: [
      "Venue up to 50 guests",
      "Basic floral decoration",
      "2-hour event slot",
      "Welcome drink station",
      "On-site coordinator",
      { text: "Photography", no: true },
      { text: "Live music / DJ", no: true },
      { text: "Catering buffet", no: true },
    ],
  },
  {
    id:       "premium",
    name:     "Premium",
    emoji:    "🎊",
    price:    14999,
    tagline:  "Most loved by our customers",
    featured: true,
    accentA:  "#a78bfa",
    accentB:  "#ec4899",
    features: [
      "Venue up to 150 guests",
      "Premium themed decoration",
      "4-hour event slot",
      "Welcome drink station",
      "Dedicated event manager",
      "Photography & videography",
      "Live music or DJ",
      { text: "Gourmet catering", no: true },
    ],
  },
  {
    id:       "luxury",
    name:     "Luxury",
    emoji:    "👑",
    price:    34999,
    tagline:  "All-inclusive grand experience",
    featured: false,
    accentA:  "#fbbf24",
    accentB:  "#f59e0b",
    features: [
      "Venue up to 400 guests",
      "Luxury 5-star decoration",
      "Full-day event slot",
      "Welcome drink station",
      "Dedicated 3-person team",
      "Photography & videography",
      "Live music & DJ",
      "Gourmet catering — 5 courses",
    ],
  },
];

const ADDONS = [
  { id: "photo",  emoji: "📸", label: "Extra Photography Hours", price: 2999 },
  { id: "cake",   emoji: "🎂", label: "Premium Custom Cake",      price: 1499 },
  { id: "decor",  emoji: "🌸", label: "Décor Upgrade",            price: 3999 },
  { id: "mc",     emoji: "🎤", label: "Emcee / Host",             price: 2499 },
];

const TIMES = ["10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"];

const REVIEWS = [
  { name:"Priya S.", avatar:"PS", from:"from-violet-500",to:"to-fuchsia-500", rating:5, text:"Absolutely magical! Every detail was perfect. The décor was beyond our expectations.", event:"Birthday · Mumbai" },
  { name:"Rahul V.", avatar:"RV", from:"from-pink-500",  to:"to-rose-500",    rating:5, text:"Professional team, flawless execution. Our anniversary felt truly royal.", event:"Anniversary · Delhi" },
  { name:"Ankit J.", avatar:"AJ", from:"from-emerald-500",to:"to-teal-500",  rating:5, text:"The corporate event went without a hitch. Impressive setup and great food.", event:"Corporate · Bengaluru" },
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const today = new Date().toISOString().split("T")[0];

function Stars({ n = 5, size = "w-4 h-4" }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={`${size} ${i < n ? "text-amber-400" : "text-white/15"}`} aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z"/>
        </svg>
      ))}
    </span>
  );
}

function Feat({ text, accentA, accentB }) {
  const isNo = typeof text === "object";
  const label = isNo ? text.text : text;
  return (
    <li className="flex items-start gap-2.5 text-sm">
      <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${isNo ? "bg-white/6 border border-white/10 text-white/20" : "text-white"}`}
        style={isNo ? {} : { background: `linear-gradient(135deg,${accentA},${accentB})` }} aria-hidden="true">
        {isNo ? "✕" : "✓"}
      </span>
      <span className={isNo ? "text-white/20 line-through" : "text-white/60"}>{label}</span>
    </li>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */
export default function EventDetail() {
  const { id } = useParams();
  const bookingRef = useRef(null);

  const [selPkg,   setSelPkg]   = useState("premium");
  const [addons,   setAddons]   = useState([]);
  const [date,     setDate]     = useState("");
  const [time,     setTime]     = useState("");
  const [guests,   setGuests]   = useState(50);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [notes,    setNotes]    = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  const pkg      = PACKAGES.find(p => p.id === selPkg) || PACKAGES[1];
  const addonAmt = ADDONS.filter(a => addons.includes(a.id)).reduce((s,a)=>s+a.price,0);
  const svcFee   = Math.round(pkg.price * 0.05);
  const total    = pkg.price + addonAmt + svcFee;

  const toggleAddon = id => setAddons(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  const scrollToBooking = () => bookingRef.current?.scrollIntoView({ behavior:"smooth", block:"start" });

  const validate = () => {
    const e = {};
    if (!name.trim())  e.name  = "Name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required.";
    if (!phone)        e.phone = "Phone is required.";
    if (!date)         e.date  = "Select a date.";
    if (!time)         e.time  = "Select a time slot.";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000);
  };

  const inputCls = field =>
    `w-full px-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${
      errors[field] ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"}`;

  /* Confirmation */
  if (done) return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px]" />
      <div className="relative text-center max-w-md w-full">
        <div className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-5xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-2xl shadow-violet-500/40 animate-bounce" style={{animationDuration:"2s"}}>🎊</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Booking Confirmed!</h2>
        <p className="text-white/45 text-sm mb-8">Your <span className="text-violet-400 font-semibold">{pkg.name} Package</span> for <span className="text-pink-400 font-semibold">{EVENT.title}</span> is booked for <span className="text-fuchsia-400 font-semibold">{date}</span> at <span className="text-fuchsia-400 font-semibold">{time}</span>.</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 mb-8 text-left space-y-3">
          {[{l:"Name",v:name},{l:"Email",v:email},{l:"Package",v:`${pkg.emoji} ${pkg.name}`},{l:"Guests",v:`${guests} people`},{l:"Total",v:fmt(total)}].map(({l,v})=>(
            <div key={l} className="flex justify-between text-sm"><span className="text-white/35">{l}</span><span className="text-white font-semibold">{v}</span></div>
          ))}
        </div>
        <div className="flex gap-3">
          <Link to="/" className="flex-1 py-3 rounded-xl text-sm font-semibold text-white/55 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200 text-center">Home</Link>
          <Link to="/events" className="flex-1 py-3 rounded-xl text-sm font-bold text-white text-center transition-all duration-200" style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.35)"}}>Browse Events →</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0118]">

      {/* ── 1. Hero Banner ───────────────────────────────────────────── */}
      <div className="relative pt-[70px] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        {/* Simulated hero image */}
        <div className="relative h-[55vh] min-h-[380px] w-full flex items-end overflow-hidden"
          style={{background:"linear-gradient(135deg,#1e0a3c 0%,#2d0a4e 40%,#1a0630 100%)"}}>

          {/* Orbs */}
          <div aria-hidden="true" className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px]" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-600/15 blur-[100px]" />

          {/* Dot grid */}
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"28px 28px"}} />

          {/* Centre illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[120px] sm:text-[160px] opacity-20 select-none" aria-hidden="true">🎂</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-3xl flex items-center justify-center text-7xl sm:text-9xl shadow-2xl" style={{background:"linear-gradient(135deg,rgba(124,58,237,0.5),rgba(236,72,153,0.4))",border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(12px)"}}>
              🎂
            </div>
          </div>

          {/* Swap comment for real image:
          <img src="/events/birthday.jpg" alt={EVENT.title} className="absolute inset-0 w-full h-full object-cover" />
          */}

          {/* Bottom gradient */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0d0118] via-[#0d0118]/40 to-transparent" />

          {/* Hero content */}
          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                {/* Category pill */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 bg-white/10 border border-white/15 text-white/65 backdrop-blur-sm">
                  <span aria-hidden="true">🎂</span>{EVENT.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight">{EVENT.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-violet-400 flex-shrink-0" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    {EVENT.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Stars n={5} size="w-3.5 h-3.5" />
                    <span className="text-white font-semibold">{EVENT.rating}</span>
                    <span className="text-white/35">({EVENT.reviews} reviews)</span>
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-start sm:items-end gap-3">
                <div>
                  <p className="text-xs text-white/35 mb-0.5">Starting at</p>
                  <p className="text-3xl font-extrabold" style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmt(EVENT.basePrice)}</p>
                </div>
                <button onClick={scrollToBooking} className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400" style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.45)"}}>
                  Book Now 🎉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* ── Left / centre column ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* ── 2. Event information ──────────────────────────────── */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>ℹ</span>
                About This Event
              </h2>
              <p className="text-sm text-white/50 leading-relaxed mb-7">{EVENT.description}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                {[
                  {icon:"⏱",label:"Duration",   value:EVENT.duration},
                  {icon:"👥",label:"Capacity",   value:EVENT.capacity},
                  {icon:"📍",label:"Location",   value:"Mumbai"},
                  {icon:"⭐",label:"Rating",     value:`${EVENT.rating} / 5`},
                ].map(({icon,label,value})=>(
                  <div key={label} className="rounded-xl bg-white/[0.03] border border-white/8 p-3 text-center">
                    <div className="text-xl mb-1" aria-hidden="true">{icon}</div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-0.5">{label}</p>
                    <p className="text-xs font-bold text-white/70">{value}</p>
                  </div>
                ))}
              </div>

              {/* What's included */}
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-7">
                {EVENT.included.map(({icon,text})=>(
                  <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8">
                    <span className="text-xl flex-shrink-0" aria-hidden="true">{icon}</span>
                    <span className="text-sm text-white/60">{text}</span>
                  </div>
                ))}
              </div>

              {/* Available services */}
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest mb-4">Available Services</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {EVENT.services.map(s=>(
                  <div key={s} className="flex items-center gap-2.5 text-sm text-white/50">
                    <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}} aria-hidden="true">✓</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* ── 3. Package selection ──────────────────────────────── */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>📦</span>
                Choose a Package
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {PACKAGES.map(p=>(
                  <button
                    key={p.id} type="button"
                    onClick={()=>setSelPkg(p.id)}
                    className={`group relative flex flex-col rounded-2xl overflow-hidden text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 border ${
                      selPkg===p.id
                        ? p.featured ? "border-violet-500/60 shadow-xl shadow-violet-500/20" : "border-white/25 shadow-lg"
                        : "border-white/8 hover:border-white/20 hover:bg-white/[0.02]"} ${selPkg===p.id&&p.featured?"ring-1 ring-violet-500/40":""}`}
                  >
                    {p.featured && (
                      <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase text-white" style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>Popular</div>
                    )}
                    {/* Header */}
                    <div className="px-5 pt-5 pb-4" style={{background:selPkg===p.id?`linear-gradient(135deg,${p.accentA}18,${p.accentB}12)`:"rgba(255,255,255,0.02)"}}>
                      <div className="text-3xl mb-2" aria-hidden="true">{p.emoji}</div>
                      <p className="text-base font-bold text-white">{p.name}</p>
                      <p className="text-[11px] text-white/35 mb-3">{p.tagline}</p>
                      <p className="text-xl font-extrabold" style={{background:`linear-gradient(to right,${p.accentA},${p.accentB})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmt(p.price)}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">per event</p>
                    </div>
                    {/* Divider */}
                    <div className="h-px mx-5 opacity-15" style={{background:`linear-gradient(to right,${p.accentA},${p.accentB})`}} />
                    {/* Features */}
                    <ul className="flex-1 px-5 py-4 space-y-2">
                      {p.features.map((f,i)=>(
                        <Feat key={i} text={f} accentA={p.accentA} accentB={p.accentB} />
                      ))}
                    </ul>
                    {/* Select btn */}
                    <div className="px-5 pb-5">
                      <div className={`w-full py-2.5 rounded-xl text-sm font-bold text-center transition-all duration-200 ${selPkg===p.id?"text-white":"text-white/50 border border-white/12"}`}
                        style={selPkg===p.id?{background:`linear-gradient(to right,${p.accentA},${p.accentB})`,boxShadow:`0 0 16px ${p.accentA}40`}:{}}>
                        {selPkg===p.id?"✓ Selected":"Select Package"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Add-ons ───────────────────────────────────────────── */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>✨</span>
                Optional Add-ons
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {ADDONS.map(({id,emoji,label,price})=>{
                  const on = addons.includes(id);
                  return (
                    <button key={id} type="button" onClick={()=>toggleAddon(id)} aria-pressed={on}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${on?"border-violet-500/50 bg-violet-500/10":"border-white/8 bg-white/[0.02] hover:border-white/20"}`}>
                      <span className="text-2xl flex-shrink-0" aria-hidden="true">{emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white/75">{label}</p>
                        <p className="text-xs font-bold text-violet-400 mt-0.5">{fmt(price)}</p>
                      </div>
                      <div className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${on?"border-transparent":"border-white/15 bg-white/5"}`}
                        style={on?{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}:{}}>
                        {on&&<svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true"><polyline points="2,6 5,9 10,3"/></svg>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 4. Booking form ───────────────────────────────────── */}
            <div ref={bookingRef} className="rounded-2xl bg-white/[0.03] border border-white/8 p-7 scroll-mt-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>📋</span>
                Your Details
              </h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Full Name</label>
                    <input id="name" type="text" value={name} onChange={e=>{setName(e.target.value);if(errors.name)setErrors(p=>({...p,name:""}))}} placeholder="Rahul Sharma" className={inputCls("name")} />
                    {errors.name&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Email</label>
                    <input id="email" type="email" value={email} onChange={e=>{setEmail(e.target.value);if(errors.email)setErrors(p=>({...p,email:""}))}} placeholder="you@example.com" className={inputCls("email")} />
                    {errors.email&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.email}</p>}
                  </div>
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Phone</label>
                    <input id="phone" type="tel" value={phone} onChange={e=>{setPhone(e.target.value);if(errors.phone)setErrors(p=>({...p,phone:""}))}} placeholder="+91 98765 43210" className={inputCls("phone")} />
                    {errors.phone&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.phone}</p>}
                  </div>
                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Guests</label>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={()=>setGuests(g=>Math.max(1,g-10))} className="w-10 h-[46px] rounded-xl bg-white/6 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-lg font-bold flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">−</button>
                      <input id="guests" type="number" min="1" max="2000" value={guests} onChange={e=>setGuests(Number(e.target.value))} className={`${inputCls(null)} text-center flex-1`} />
                      <button type="button" onClick={()=>setGuests(g=>Math.min(2000,g+10))} className="w-10 h-[46px] rounded-xl bg-white/6 border border-white/10 hover:border-white/25 text-white/60 hover:text-white text-lg font-bold flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">+</button>
                    </div>
                  </div>
                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Event Date</label>
                    <input id="date" type="date" min={today} value={date} onChange={e=>{setDate(e.target.value);if(errors.date)setErrors(p=>({...p,date:""}))}} className={`${inputCls("date")} [color-scheme:dark]`} />
                    {errors.date&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.date}</p>}
                  </div>
                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Time Slot</label>
                    <select id="time" value={time} onChange={e=>{setTime(e.target.value);if(errors.time)setErrors(p=>({...p,time:""}))}} className={`${inputCls("time")} appearance-none`}>
                      <option value="" disabled className="bg-[#0d0118]">Select a time</option>
                      {TIMES.map(t=><option key={t} value={t} className="bg-[#0d0118]">{t}</option>)}
                    </select>
                    {errors.time&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.time}</p>}
                  </div>
                </div>
                {/* Notes */}
                <div className="mb-6">
                  <label htmlFor="notes" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Special Requests</label>
                  <textarea id="notes" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Theme preferences, dietary requirements, special arrangements..." className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200 resize-none" />
                </div>
                <button type="submit" disabled={loading} className="relative overflow-hidden group w-full py-4 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.4)"}}>
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  {loading
                    ? <span className="flex items-center justify-center gap-2"><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/></svg>Confirming…</span>
                    : `Confirm & Pay · ${fmt(total)}`}
                </button>
              </form>
            </div>

            {/* ── Reviews ───────────────────────────────────────────── */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-7">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>★</span>
                Customer Reviews
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <Stars n={5} size="w-5 h-5" />
                <span className="text-2xl font-extrabold text-white">{EVENT.rating}</span>
                <span className="text-sm text-white/35">({EVENT.reviews} verified reviews)</span>
              </div>
              <div className="space-y-4">
                {REVIEWS.map(r=>(
                  <div key={r.name} className="p-5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${r.from} ${r.to}`}>{r.avatar}</div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">{r.name}</p>
                        <p className="text-[11px] text-white/35">{r.event}</p>
                      </div>
                      <div className="ml-auto"><Stars n={r.rating} size="w-3.5 h-3.5" /></div>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sticky summary sidebar ───────────────────────────────── */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/30">
              <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              <div className="px-6 pt-6 pb-4 border-b border-white/8">
                <h3 className="text-base font-bold text-white mb-0.5">Order Summary</h3>
                <p className="text-xs text-white/30">Review before confirming</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                {/* Selected package */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <span className="text-2xl" aria-hidden="true">{pkg.emoji}</span>
                  <div>
                    <p className="text-sm font-bold text-white">{pkg.name} Package</p>
                    <p className="text-xs font-bold text-violet-400">{fmt(pkg.price)}</p>
                  </div>
                </div>
                {/* Event info */}
                <div className="space-y-2.5 text-sm">
                  {[
                    {icon:"📅",label:"Date",  val:date||"Not selected"},
                    {icon:"🕐",label:"Time",  val:time||"Not selected"},
                    {icon:"👥",label:"Guests",val:`${guests} people`},
                  ].map(({icon,label,val})=>(
                    <div key={label} className="flex justify-between">
                      <span className="text-white/35 flex items-center gap-1.5"><span aria-hidden="true">{icon}</span>{label}</span>
                      <span className={`text-xs font-medium ${val.includes("Not selected")?"text-white/20 italic":"text-white/65"}`}>{val}</span>
                    </div>
                  ))}
                </div>
                {/* Add-ons */}
                {addons.length>0&&(
                  <div className="pt-1">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Add-ons</p>
                    {ADDONS.filter(a=>addons.includes(a.id)).map(a=>(
                      <div key={a.id} className="flex justify-between text-xs text-white/45 mb-1">
                        <span>{a.emoji} {a.label}</span><span className="font-semibold">{fmt(a.price)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Price breakdown */}
                <div className="pt-3 border-t border-white/8 space-y-2 text-sm">
                  <div className="flex justify-between text-white/40"><span>Package</span><span>{fmt(pkg.price)}</span></div>
                  {addonAmt>0&&<div className="flex justify-between text-white/40"><span>Add-ons</span><span>{fmt(addonAmt)}</span></div>}
                  <div className="flex justify-between text-white/40"><span>Service fee (5%)</span><span>{fmt(svcFee)}</span></div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/8">
                    <span>Total</span>
                    <span style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmt(total)}</span>
                  </div>
                </div>
                <button onClick={scrollToBooking} className="relative overflow-hidden group w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400" style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.35)"}}>
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  Book Now · {fmt(total)}
                </button>
                <div className="flex justify-center gap-4 pt-1">
                  {["🔒 Secure","↩️ Free cancel","🎧 Support"].map(t=>(
                    <span key={t} className="text-[10px] text-white/20 font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}