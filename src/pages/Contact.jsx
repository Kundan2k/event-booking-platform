import { useState } from "react";

const CONTACT_INFO = [
  { icon:"📞", label:"Phone",   value:"+91 98765 43210",    href:"tel:+919876543210" },
  { icon:"📧", label:"Email",   value:"hello@eventora.in",  href:"mailto:hello@eventora.in" },
  { icon:"📍", label:"Address", value:"Bandra West, Mumbai — 400050", href:"https://maps.google.com" },
  { icon:"🕐", label:"Hours",   value:"Mon–Sat, 9 AM – 8 PM", href:null },
];

export default function Contact() {
  const [form,    setForm]    = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);

  const set = f => e => { setForm(p=>({...p,[f]:e.target.value})); if(errors[f]) setErrors(p=>({...p,[f]:""})); };

  const validate = () => {
    const e = {};
    if(!form.name.trim())                              e.name    = "Name is required.";
    if(!form.email||!/\S+@\S+\.\S+/.test(form.email)) e.email   = "Valid email required.";
    if(!form.message.trim())                           e.message = "Message is required.";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if(Object.keys(errs).length){ setErrors(errs); return; }
    setLoading(true);
    setTimeout(()=>{ setLoading(false); setSent(true); }, 1800);
  };

  const iCls = f => `w-full px-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${errors[f]?"border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20":"border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"}`;

  return (
    <div className="min-h-screen bg-[#0d0118]">
      <div aria-hidden="true" className="fixed -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/6 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 animate-pulse"/>
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            We'd Love to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Hear From You</span>
          </h1>
          <p className="text-base text-white/45 leading-relaxed">
            Have a question, a custom event request, or just want to say hello? Our team typically responds within 2 hours.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_INFO.map(({icon,label,value,href})=>(
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl bg-white/6 border border-white/10">{icon}</div>
                <div>
                  <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-0.5">{label}</p>
                  {href
                    ? <a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">{value}</a>
                    : <p className="text-sm font-semibold text-white/70">{value}</p>}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-5">
              <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon:"📸", label:"Instagram", href:"https://instagram.com" },
                  { icon:"📘", label:"Facebook",  href:"https://facebook.com"  },
                  { icon:"🐦", label:"Twitter",   href:"https://twitter.com"   },
                ].map(({icon,label,href})=>(
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 hover:border-white/25 hover:bg-white/10 flex items-center justify-center text-lg transition-all duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl animate-bounce" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 32px rgba(124,58,237,0.4)",animationDuration:"2s"}}>✉️</div>
                <h3 className="text-xl font-extrabold text-white">Message Sent!</h3>
                <p className="text-sm text-white/45">Thanks {form.name.split(" ")[0]}! We'll get back to you at <span className="text-violet-400">{form.email}</span> within 2 hours.</p>
                <button onClick={()=>{ setSent(false); setForm({name:"",email:"",phone:"",subject:"",message:""}); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white/55 border border-white/12 hover:border-white/25 hover:text-white transition-all duration-200">
                  Send another →
                </button>
              </div>
            ) : (
              <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-8 backdrop-blur-sm relative overflow-hidden">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"/>
                <h2 className="text-lg font-bold text-white mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Full Name <span className="text-rose-400">*</span></label>
                      <input id="c-name" type="text" value={form.name} onChange={set("name")} placeholder="Rahul Sharma" className={iCls("name")}/>
                      {errors.name&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Email <span className="text-rose-400">*</span></label>
                      <input id="c-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={iCls("email")}/>
                      {errors.email&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-phone" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Phone</label>
                      <input id="c-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={iCls("phone")}/>
                    </div>
                    <div>
                      <label htmlFor="c-subject" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Subject</label>
                      <select id="c-subject" value={form.subject} onChange={set("subject")} className={`${iCls("subject")} appearance-none`}>
                        <option value="" className="bg-[#0d0118]">Select a topic</option>
                        <option value="booking"   className="bg-[#0d0118]">Booking Enquiry</option>
                        <option value="packages"  className="bg-[#0d0118]">Package Information</option>
                        <option value="support"   className="bg-[#0d0118]">Customer Support</option>
                        <option value="vendor"    className="bg-[#0d0118]">Vendor Partnership</option>
                        <option value="other"     className="bg-[#0d0118]">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="block text-xs font-semibold text-white/40 tracking-widest uppercase mb-2">Message <span className="text-rose-400">*</span></label>
                    <textarea id="c-msg" rows={5} value={form.message} onChange={set("message")} placeholder="Tell us about your event or question..." className={`${iCls("message")} resize-none`}/>
                    {errors.message&&<p className="mt-1.5 text-xs text-rose-400">⚠ {errors.message}</p>}
                  </div>
                  <button type="submit" disabled={loading} className="relative overflow-hidden group w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70"
                    style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.4)"}}>
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"/>
                    {loading
                      ? <span className="flex items-center justify-center gap-2"><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/></svg>Sending…</span>
                      : "Send Message →"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}