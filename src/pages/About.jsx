import { Link } from "react-router-dom";

const TEAM = [
  { name:"Arjun Mehta",    role:"CEO & Co-Founder",    avatar:"AM", from:"from-violet-500", to:"to-fuchsia-500", emoji:"🚀" },
  { name:"Sneha Kapoor",   role:"Head of Operations",  avatar:"SK", from:"from-pink-500",   to:"to-rose-500",    emoji:"⚙️" },
  { name:"Ravi Patel",     role:"Lead Designer",       avatar:"RP", from:"from-sky-500",    to:"to-blue-500",    emoji:"🎨" },
  { name:"Meera Nair",     role:"Customer Success",    avatar:"MN", from:"from-emerald-500",to:"to-teal-500",    emoji:"💬" },
];

const MILESTONES = [
  { year:"2021", title:"Founded",          desc:"Eventora was born out of a frustration with fragmented event planning tools."         },
  { year:"2022", title:"1,000 Events",     desc:"Crossed our first milestone of 1,000 events booked within 8 months of launch."       },
  { year:"2023", title:"Pan-India Launch", desc:"Expanded to 10 cities across India with 150+ verified venue partners."               },
  { year:"2024", title:"12k+ Happy Clients",desc:"Trusted by over 12,000 customers with a consistent 4.9-star average rating."       },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0d0118]">

      {/* Ambient */}
      <div aria-hidden="true" className="fixed -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="fixed -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/8 blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            We Make{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Celebrations
            </span>{" "}
            Effortless
          </h1>
          <p className="text-lg text-white/45 leading-relaxed mb-8 max-w-2xl mx-auto">
            Eventora was built with one mission: to take the stress out of event planning so you can focus on what truly matters — enjoying the moment.
          </p>
          <Link to="/booking" className="inline-block px-8 py-4 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.4)"}}>
            Book an Event 🎉
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            {v:"12k+",l:"Events Booked",   a:"#a78bfa",b:"#ec4899"},
            {v:"4.9★",l:"Average Rating",  a:"#fbbf24",b:"#f59e0b"},
            {v:"150+",l:"Verified Venues", a:"#34d399",b:"#06b6d4"},
            {v:"10",  l:"Cities Covered",  a:"#f472b6",b:"#fb7185"},
          ].map(({v,l,a,b})=>(
            <div key={l} className="rounded-2xl bg-white/[0.03] border border-white/8 py-7 px-4">
              <p className="text-3xl font-extrabold mb-1" style={{background:`linear-gradient(to right,${a},${b})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</p>
              <p className="text-xs text-white/35 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
              Why We Built{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Eventora</span>
            </h2>
            <p className="text-base text-white/45 leading-relaxed mb-4">
              Event planning was broken. Calling vendors one by one, haggling over prices, chasing confirmations — it was exhausting. We decided to fix it.
            </p>
            <p className="text-base text-white/45 leading-relaxed">
              Eventora brings together verified venues, trusted vendors, and seamless booking into one beautiful platform — so every celebration gets the attention it deserves.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {icon:"🎯",title:"Curated Quality",    desc:"Every vendor is vetted and rated by real customers."},
              {icon:"⚡",title:"Instant Booking",    desc:"Confirm your event in minutes, not days."},
              {icon:"💰",title:"Transparent Pricing",desc:"No hidden fees. What you see is what you pay."},
              {icon:"🤝",title:"End-to-End Support", desc:"We're with you from planning to the last dance."},
            ].map(({icon,title,desc})=>(
              <div key={title} className="rounded-2xl bg-white/[0.03] border border-white/8 p-5 hover:border-white/15 hover:-translate-y-1 transition-all duration-200">
                <span className="text-2xl mb-3 block" aria-hidden="true">{icon}</span>
                <p className="text-sm font-bold text-white mb-1">{title}</p>
                <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Our <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="relative">
            <div aria-hidden="true" className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/8 -translate-x-1/2" />
            <div className="space-y-10">
              {MILESTONES.map(({year,title,desc},i)=>(
                <div key={year} className={`relative flex items-start gap-6 ${i%2===0?"sm:flex-row":"sm:flex-row-reverse"}`}>
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-1.5 flex-shrink-0" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 12px rgba(124,58,237,0.5)"}} aria-hidden="true"/>
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${i%2===0?"sm:pr-10":"sm:pl-10"}`}>
                    <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-5 hover:border-white/15 transition-all duration-200">
                      <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">{year}</span>
                      <p className="text-base font-bold text-white mt-1 mb-1">{title}</p>
                      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">
            Meet the <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({name,role,avatar,from,to,emoji})=>(
              <div key={name} className="rounded-2xl bg-white/[0.03] border border-white/8 p-6 text-center hover:border-white/20 hover:-translate-y-1 transition-all duration-200">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white bg-gradient-to-br ${from} ${to} shadow-lg`}>{avatar}</div>
                <p className="text-sm font-bold text-white mb-0.5">{name}</p>
                <p className="text-xs text-white/35">{role}</p>
                <span className="mt-3 block text-xl" aria-hidden="true">{emoji}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to celebrate?</h2>
          <p className="text-base text-white/40 mb-8">Join 12,000+ customers who trust Eventora for their most special moments.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/booking" className="px-8 py-4 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.4)"}}>Book an Event 🎉</Link>
            <Link to="/contact" className="px-8 py-4 rounded-xl text-sm font-bold text-white/60 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200">Talk to Us →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}