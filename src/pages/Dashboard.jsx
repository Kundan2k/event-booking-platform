import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ─── Static data ─────────────────────────────────────────────────────────── */
const BOOKINGS = [
  { id:"EVT-001", emoji:"🎂", event:"Royal Birthday Bash",     date:"15 Jul 2025", venue:"The Grand Ballroom, Mumbai",     package:"Premium", price:14999, guests:80,  status:"confirmed", category:"birthday"   },
  { id:"EVT-002", emoji:"💍", event:"Silver Anniversary Night", date:"22 Aug 2025", venue:"Rosewood Garden, Delhi",         package:"Luxury",  price:34999, guests:30,  status:"confirmed", category:"anniversary"},
  { id:"EVT-003", emoji:"🏢", event:"Q3 Corporate Annual Meet", date:"10 Sep 2025", venue:"Pearl Convention Centre, Chennai",package:"Basic",   price:5999,  guests:200, status:"pending",   category:"corporate"  },
  { id:"EVT-004", emoji:"👶", event:"Baby Shower Celebration",  date:"01 Oct 2025", venue:"Skyline Terrace, Bengaluru",     package:"Premium", price:14999, guests:40,  status:"confirmed", category:"baby-shower"},
  { id:"EVT-005", emoji:"👰", event:"Dream Wedding Ceremony",   date:"18 Nov 2025", venue:"Blue Lotus Resort, Pune",        package:"Luxury",  price:74999, guests:350, status:"pending",   category:"wedding"    },
  { id:"EVT-006", emoji:"🎓", event:"Office Farewell Party",    date:"05 Mar 2025", venue:"The Heritage Hall, Hyderabad",   package:"Basic",   price:7999,  guests:60,  status:"completed", category:"farewell"   },
  { id:"EVT-007", emoji:"🎉", event:"25th Birthday Surprise",   date:"14 Jan 2025", venue:"Rosewood Garden, Delhi",         package:"Premium", price:13999, guests:50,  status:"completed", category:"birthday"   },
];

const NOTIFICATIONS = [
  { id:1, type:"success", icon:"✅", title:"Booking Confirmed",        body:"Your Royal Birthday Bash on Jul 15 is confirmed.",           time:"2 hrs ago",  read:false },
  { id:2, type:"info",    icon:"📅", title:"Event Reminder",           body:"Silver Anniversary Night is in 7 days. Check your checklist.",time:"1 day ago",  read:false },
  { id:3, type:"warning", icon:"⏳", title:"Payment Pending",          body:"Complete payment for Q3 Corporate Meet to secure your slot.", time:"2 days ago", read:true  },
  { id:4, type:"info",    icon:"🎁", title:"New Package Available",    body:"Check our exclusive Monsoon Wedding package — limited slots.", time:"3 days ago", read:true  },
  { id:5, type:"success", icon:"⭐", title:"Review Request",           body:"How was your 25th Birthday Surprise? Leave a review!",       time:"4 days ago", read:true  },
];

const STATUS = {
  confirmed: { bg:"bg-emerald-500/15", border:"border-emerald-500/30", text:"text-emerald-400", dot:"bg-emerald-400", label:"Confirmed" },
  pending:   { bg:"bg-amber-500/15",   border:"border-amber-500/30",   text:"text-amber-400",   dot:"bg-amber-400",   label:"Pending"   },
  completed: { bg:"bg-sky-500/15",     border:"border-sky-500/30",     text:"text-sky-400",     dot:"bg-sky-400",     label:"Completed" },
  cancelled: { bg:"bg-rose-500/15",    border:"border-rose-500/30",    text:"text-rose-400",    dot:"bg-rose-400",    label:"Cancelled" },
};

const NOTIF_STYLE = {
  success: "border-l-emerald-500/60 bg-emerald-500/5",
  warning: "border-l-amber-500/60 bg-amber-500/5",
  info:    "border-l-violet-500/60 bg-violet-500/5",
};

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

/* ─── Reusable components ─────────────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, from, to, trend }) {
  return (
    <div className="group relative rounded-2xl p-5 bg-white/[0.03] border border-white/8 hover:border-white/18 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"/>
      <div aria-hidden="true" className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{background:`radial-gradient(ellipse at top left,${from}08,transparent 60%)`}}/>
      <div className="relative flex items-start justify-between gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{background:`linear-gradient(135deg,${from}25,${to}15)`,border:`1px solid ${from}30`}}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${trend>0?"bg-emerald-500/15 text-emerald-400":"bg-rose-500/15 text-rose-400"}`}>
            {trend>0?"+":""}{trend}%
          </span>
        )}
      </div>
      <p className="relative text-2xl sm:text-3xl font-extrabold mt-3 leading-none"
        style={{background:`linear-gradient(to right,${from},${to})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
        {value}
      </p>
      <p className="relative text-sm font-semibold text-white/65 mt-1">{label}</p>
      {sub && <p className="relative text-xs text-white/30 mt-0.5">{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.bg} ${s.border} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`}/>
      {s.label}
    </span>
  );
}

function BookingCard({ booking, onCancel }) {
  const { id, emoji, event, date, venue, package: pkg, price, guests, status } = booking;
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/8 hover:border-white/18 hover:shadow-xl transition-all duration-300">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"/>

      {/* Image placeholder */}
      <div className="relative h-36 flex items-center justify-center overflow-hidden"
        style={{background:"linear-gradient(135deg,rgba(124,58,237,0.2),rgba(236,72,153,0.12))"}}>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
        <span className="text-6xl select-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 drop-shadow-2xl" role="img" aria-label={event}>{emoji}</span>
        <div className="absolute top-3 left-3"><StatusBadge status={status}/></div>
        <div className="absolute top-3 right-3 text-[10px] font-bold text-white/50 bg-black/30 px-2 py-1 rounded-full border border-white/10 backdrop-blur-sm">{id}</div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-white mb-1 leading-snug truncate">{event}</h3>
        <p className="text-xs text-white/30 mb-4 truncate">📍 {venue}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            {icon:"📅",label:"Date",    val:date},
            {icon:"📦",label:"Package", val:pkg},
            {icon:"👥",label:"Guests",  val:`${guests} people`},
            {icon:"💰",label:"Amount",  val:fmt(price)},
          ].map(({icon,label,val})=>(
            <div key={label} className="rounded-lg bg-white/[0.03] border border-white/6 px-3 py-2">
              <p className="text-[10px] text-white/25 font-medium mb-0.5">{icon} {label}</p>
              <p className="text-xs font-bold text-white/70 truncate">{val}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-lg text-xs font-semibold text-white/55 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200">
            View Details
          </button>
          {status==="confirmed"&&(
            <button className="flex-1 py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>
              Manage
            </button>
          )}
          {status==="pending"&&(
            <button className="flex-1 py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
              style={{background:"linear-gradient(to right,#f59e0b,#fb923c)"}}>
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function NotifItem({ notif, onRead }) {
  return (
    <div onClick={()=>onRead(notif.id)}
      className={`relative flex items-start gap-4 p-4 rounded-xl border-l-4 cursor-pointer transition-all duration-200 hover:bg-white/[0.04] ${NOTIF_STYLE[notif.type]} ${!notif.read?"ring-1 ring-white/5":""}`}>
      <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{notif.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-sm font-bold text-white/80">{notif.title}</p>
          {!notif.read&&<span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0"/>}
        </div>
        <p className="text-xs text-white/40 leading-relaxed mb-1">{notif.body}</p>
        <p className="text-[10px] text-white/25">{notif.time}</p>
      </div>
    </div>
  );
}

/* ─── Sidebar nav ──────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id:"overview",   icon:"🏠", label:"Overview"         },
  { id:"upcoming",   icon:"📅", label:"Upcoming Events"  },
  { id:"bookings",   icon:"📋", label:"My Bookings"      },
  { id:"history",    icon:"🕐", label:"Booking History"  },
  { id:"profile",    icon:"👤", label:"Profile"          },
  { id:"notifications",icon:"🔔",label:"Notifications"   },
];

/* ─── Main Dashboard ───────────────────────────────────────────────────────── */
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tab,       setTab]       = useState("overview");
  const [sideOpen,  setSideOpen]  = useState(false);
  const [notifs,    setNotifs]    = useState(NOTIFICATIONS);
  const [editMode,  setEditMode]  = useState(false);
  const [profile,   setProfile]   = useState({
    name:  user?.name  || "Rahul Sharma",
    email: user?.email || "rahul@example.com",
    phone: "+91 98765 43210",
    city:  "Mumbai, India",
    bio:   "Event enthusiast & celebration lover 🎉",
  });
  const [profileDraft, setProfileDraft] = useState(profile);

  if (!user) return <Navigate to="/auth" replace/>;

  const upcoming  = BOOKINGS.filter(b=>b.status==="confirmed"||b.status==="pending");
  const completed = BOOKINGS.filter(b=>b.status==="completed");
  const totalSpent = BOOKINGS.filter(b=>b.status!=="cancelled").reduce((s,b)=>s+b.price,0);
  const unread    = notifs.filter(n=>!n.read).length;

  const markRead = id => setNotifs(p=>p.map(n=>n.id===id?{...n,read:true}:n));
  const markAllRead = () => setNotifs(p=>p.map(n=>({...n,read:true})));

  const saveProfile = () => { setProfile(profileDraft); setEditMode(false); };

  const goTo = id => { setTab(id); setSideOpen(false); };

  /* Stats */
  const STATS = [
    { icon:"📅", label:"Total Bookings",  value:BOOKINGS.length, sub:"All time",     from:"#7c3aed", to:"#a78bfa", trend:12  },
    { icon:"🎉", label:"Upcoming Events", value:upcoming.length, sub:"Next 6 months", from:"#ec4899", to:"#f472b6", trend:5   },
    { icon:"✅", label:"Completed",       value:completed.length,sub:"Successfully done",from:"#34d399",to:"#6ee7b7",trend:0  },
    { icon:"💰", label:"Total Spent",     value:fmt(totalSpent), sub:"Across all events",from:"#f59e0b",to:"#fbbf24",trend:-3 },
  ];

  return (
    <div className="min-h-screen bg-[#0d0118] flex">

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <>
        {/* Mobile overlay */}
        {sideOpen && <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={()=>setSideOpen(false)}/>}

        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 flex flex-col
          border-r border-white/8 transition-transform duration-300 ease-in-out
          ${sideOpen?"translate-x-0":"-translate-x-full"} lg:relative lg:translate-x-0 lg:flex
        `} style={{background:"rgba(10,1,20,0.95)",backdropFilter:"blur(20px)"}}>

          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/8">
            <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 16px rgba(124,58,237,0.45)"}}>🎉</div>
              <span className="text-lg font-extrabold text-white">Event<span style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ora</span></span>
            </Link>
          </div>

          {/* User */}
          <div className="px-5 py-4 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold text-white shadow-lg"
                  style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>
                  {profile.name[0].toUpperCase()}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0114]"/>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{profile.name}</p>
                <p className="text-xs text-white/35 truncate">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map(n=>(
              <button key={n.id} onClick={()=>goTo(n.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 relative ${
                  tab===n.id?"text-white shadow-lg":"text-white/40 hover:text-white hover:bg-white/5"}`}
                style={tab===n.id?{background:"linear-gradient(135deg,rgba(124,58,237,0.28),rgba(236,72,153,0.18))",border:"1px solid rgba(124,58,237,0.35)"}:{}}>
                <span className="text-base flex-shrink-0" aria-hidden="true">{n.icon}</span>
                {n.label}
                {n.id==="notifications"&&unread>0&&(
                  <span className="ml-auto text-[10px] font-bold text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>{unread}</span>
                )}
                {n.id==="bookings"&&(
                  <span className="ml-auto text-[10px] font-bold text-white/50 bg-white/8 px-1.5 py-0.5 rounded-full">{BOOKINGS.length}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div className="px-3 py-4 border-t border-white/8 space-y-1">
            <Link to="/booking"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 12px rgba(124,58,237,0.35)"}}>
              <span aria-hidden="true">+</span> New Booking
            </Link>
            <button onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400/60 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Log Out
            </button>
          </div>
        </aside>
      </>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 sticky top-0 z-20"
          style={{background:"rgba(10,1,20,0.85)",backdropFilter:"blur(20px)"}}>
          <div className="flex items-center gap-3">
            <button onClick={()=>setSideOpen(true)} aria-label="Open menu"
              className="lg:hidden w-9 h-9 rounded-lg border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <h1 className="text-base font-bold text-white">{NAV_ITEMS.find(n=>n.id===tab)?.label}</h1>
              <p className="text-xs text-white/30 hidden sm:block">Welcome back, {profile.name.split(" ")[0]}! 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>goTo("notifications")} aria-label={`${unread} notifications`}
              className="relative w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400">
              🔔
              {unread>0&&<span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>{unread}</span>}
            </button>
            <Link to="/" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-xs font-medium text-white/45 hover:text-white hover:border-white/25 transition-all duration-200">
              ← Home
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7">

          {/* ── Overview ──────────────────────────────────────────── */}
          {tab==="overview" && (
            <div className="max-w-5xl mx-auto space-y-7">
              {/* Stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {STATS.map(s=><StatCard key={s.label} {...s}/>)}
              </div>

              {/* Upcoming + Quick actions */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Upcoming */}
                <div className="lg:col-span-2 rounded-2xl bg-white/[0.03] border border-white/8 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold text-white">Upcoming Events</h2>
                    <button onClick={()=>goTo("upcoming")} className="text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors">View all →</button>
                  </div>
                  <div className="space-y-3">
                    {upcoming.slice(0,3).map(b=>(
                      <div key={b.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/6 hover:border-white/15 transition-all duration-200">
                        <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl bg-white/5 border border-white/10">{b.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{b.event}</p>
                          <p className="text-xs text-white/35 truncate">📅 {b.date} · 📍 {b.venue.split(",")[0]}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <StatusBadge status={b.status}/>
                          <span className="text-xs font-bold" style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{fmt(b.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="space-y-3">
                  <h2 className="text-base font-bold text-white mb-1">Quick Actions</h2>
                  {[
                    {icon:"🎉",label:"Book New Event",   sub:"Plan your next celebration", to:"/booking", grad:true},
                    {icon:"📦",label:"Browse Packages",  sub:"View all-inclusive deals",   to:"/packages"},
                    {icon:"🏢",label:"Explore Events",   sub:"Discover curated events",    to:"/events"},
                    {icon:"💬",label:"Contact Support",  sub:"We're here 24/7",            to:"/contact"},
                  ].map(({icon,label,sub,to,grad})=>(
                    <Link key={label} to={to}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                        grad?"border-violet-500/30 hover:border-violet-400/60":"border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"}`}
                      style={grad?{background:"linear-gradient(135deg,rgba(124,58,237,0.2),rgba(236,72,153,0.12))"}:{}}>
                      <span className="text-xl flex-shrink-0" aria-hidden="true">{icon}</span>
                      <div>
                        <p className="text-sm font-bold text-white">{label}</p>
                        <p className="text-xs text-white/35">{sub}</p>
                      </div>
                      <span className="ml-auto text-white/20 text-sm" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Spending chart placeholder */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6">
                <h2 className="text-base font-bold text-white mb-5">Spending Overview</h2>
                <div className="flex items-end gap-2 h-28">
                  {[40,65,30,80,55,90,70,45,100,60,75,85].map((h,i)=>(
                    <div key={i} className="flex-1 rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{height:`${h}%`,background:i===9?"linear-gradient(to top,#7c3aed,#ec4899)":"rgba(124,58,237,0.25)",border:"1px solid rgba(124,58,237,0.2)"}}
                      title={`Month ${i+1}`}/>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-white/20">
                  {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m=><span key={m}>{m}</span>)}
                </div>
              </div>
            </div>
          )}

          {/* ── Upcoming ──────────────────────────────────────────── */}
          {tab==="upcoming" && (
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
                  <p className="text-sm text-white/35 mt-0.5">{upcoming.length} events scheduled</p>
                </div>
                <Link to="/booking" className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>+ Book Event</Link>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {upcoming.map(b=><BookingCard key={b.id} booking={b}/>)}
              </div>
            </div>
          )}

          {/* ── Bookings ──────────────────────────────────────────── */}
          {tab==="bookings" && (
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">My Bookings</h2>
                  <p className="text-sm text-white/35 mt-0.5">{BOOKINGS.filter(b=>b.status!=="completed").length} active bookings</p>
                </div>
                <Link to="/booking" className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>+ New Booking</Link>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {BOOKINGS.filter(b=>b.status!=="completed").map(b=><BookingCard key={b.id} booking={b}/>)}
              </div>
            </div>
          )}

          {/* ── History ───────────────────────────────────────────── */}
          {tab==="history" && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Booking History</h2>
                <p className="text-sm text-white/35 mt-0.5">{completed.length} completed events</p>
              </div>
              <div className="space-y-4">
                {completed.map(b=>(
                  <div key={b.id} className="rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 p-5 transition-all duration-200">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl"
                        style={{background:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(236,72,153,0.1))",border:"1px solid rgba(124,58,237,0.2)"}}>
                        {b.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <p className="text-base font-bold text-white">{b.event}</p>
                            <p className="text-xs text-white/30 mt-0.5">#{b.id} · {b.package} Package</p>
                          </div>
                          <StatusBadge status={b.status}/>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-white/40 mb-4">
                          <span>📅 {b.date}</span>
                          <span>📍 {b.venue.split(",")[0]}</span>
                          <span>👥 {b.guests} guests</span>
                          <span className="font-bold" style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>💰 {fmt(b.price)}</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white/50 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200">View Receipt</button>
                          <button className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
                            style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>⭐ Write Review</button>
                          <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white/50 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200">Rebook</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Profile ───────────────────────────────────────────── */}
          {tab==="profile" && (
            <div className="max-w-2xl mx-auto space-y-5">
              {/* Avatar card */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-8 text-center relative overflow-hidden">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"/>
                <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-violet-600/8 to-transparent pointer-events-none"/>
                <div className="relative">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl"
                      style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 40px rgba(124,58,237,0.5)"}}>
                      {profile.name[0].toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#0d0118] flex items-center justify-center">
                      <span className="text-[10px]" aria-hidden="true">✓</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mb-0.5">{profile.name}</h2>
                  <p className="text-sm text-white/40 mb-1">{profile.email}</p>
                  <p className="text-xs text-white/25 mb-5">Member since June 2025 · {profile.city}</p>
                  <div className="flex justify-center gap-8 py-5 border-t border-b border-white/8 mb-5">
                    {[{v:BOOKINGS.length,l:"Bookings"},{v:completed.length,l:"Completed"},{v:fmt(totalSpent),l:"Total Spent"}].map(({v,l})=>(
                      <div key={l} className="text-center">
                        <p className="text-xl font-extrabold" style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</p>
                        <p className="text-xs text-white/30">{l}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={()=>{setEditMode(true);setProfileDraft(profile)}}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
                    style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>
                    ✏️ Edit Profile
                  </button>
                </div>
              </div>

              {/* Info / Edit */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">Personal Information</h3>
                  {!editMode
                    ? <button onClick={()=>{setEditMode(true);setProfileDraft(profile)}} className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-semibold">Edit →</button>
                    : <div className="flex gap-2">
                        <button onClick={()=>setEditMode(false)} className="text-xs text-white/35 hover:text-white transition-colors">Cancel</button>
                        <button onClick={saveProfile} className="text-xs font-bold text-white px-3 py-1 rounded-lg transition-all duration-200" style={{background:"linear-gradient(to right,#7c3aed,#ec4899)"}}>Save</button>
                      </div>}
                </div>
                <div className="space-y-3">
                  {[
                    {icon:"👤",label:"Full Name",   field:"name",  type:"text"},
                    {icon:"📧",label:"Email",       field:"email", type:"email"},
                    {icon:"📞",label:"Phone",       field:"phone", type:"tel"},
                    {icon:"📍",label:"City",        field:"city",  type:"text"},
                    {icon:"💬",label:"Bio",         field:"bio",   type:"text"},
                  ].map(({icon,label,field,type})=>(
                    <div key={field} className={`flex items-center gap-3 py-3 ${editMode?"":"border-b border-white/5 last:border-0"}`}>
                      <span className="text-lg flex-shrink-0" aria-hidden="true">{icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/25 mb-0.5">{label}</p>
                        {editMode
                          ? <input type={type} value={profileDraft[field]} onChange={e=>setProfileDraft(p=>({...p,[field]:e.target.value}))}
                              className="w-full px-3 py-2 rounded-lg bg-white/6 border border-white/12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all duration-200"/>
                          : <p className="text-sm font-semibold text-white/70 truncate">{profile[field]}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={logout} className="w-full py-3 rounded-xl text-sm font-semibold text-rose-400 border border-rose-500/25 hover:border-rose-500/50 hover:bg-rose-500/8 transition-all duration-200">
                Sign Out
              </button>
            </div>
          )}

          {/* ── Notifications ────────────────────────────────────────*/}
          {tab==="notifications" && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Notifications</h2>
                  <p className="text-sm text-white/35 mt-0.5">{unread} unread</p>
                </div>
                {unread>0&&<button onClick={markAllRead} className="text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors">Mark all read</button>}
              </div>
              <div className="space-y-3">
                {notifs.map(n=><NotifItem key={n.id} notif={n} onRead={markRead}/>)}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}