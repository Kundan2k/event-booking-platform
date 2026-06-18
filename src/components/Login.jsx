import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/* ── shared primitives ─────────────────────────────────────────────────────── */
function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-white/45 tracking-widest uppercase mb-2">
      {children}{required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
  );
}
function Err({ msg }) {
  return msg ? <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1" role="alert"><span>⚠</span>{msg}</p> : null;
}
function iCls(err) {
  return `w-full px-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${err ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20" : "border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"}`;
}
function Spinner() {
  return <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/></svg>;
}
function EyeOff() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>; }
function EyeOn()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }

/* ── brand panel ───────────────────────────────────────────────────────────── */
function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full px-10 py-12 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-fuchsia-900/30 to-[#0d0118]"/>
      <div aria-hidden="true" className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-violet-600/25 blur-3xl"/>
      <div aria-hidden="true" className="absolute -bottom-20 -right-10 w-48 h-48 rounded-full bg-pink-600/20 blur-3xl"/>
      <div className="relative">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.5)"}}>🎉</div>
          <span className="text-xl font-extrabold text-white">Event<span style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ora</span></span>
        </Link>
      </div>
      <div className="relative">
        <div className="text-6xl mb-6 select-none">👋</div>
        <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">Welcome back<br/>to Eventora</h2>
        <p className="text-sm text-white/45 leading-relaxed mb-8">Sign in to manage your bookings and plan unforgettable celebrations.</p>
        <ul className="space-y-3">
          {["Birthday & Anniversary events","Weddings & Corporate bookings","12,000+ events celebrated","4.9★ average rating"].map(t=>(
            <li key={t} className="flex items-center gap-3 text-sm text-white/55">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 bg-white/8 border border-white/10">✓</span>{t}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative flex items-center gap-3">
        <div className="flex -space-x-2">
          {["PS","RV","AJ","NK","SM"].map((i,idx)=>(
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d0118] flex items-center justify-center text-xs font-bold text-white"
              style={{background:`hsl(${260+idx*25},70%,55%)`}}>{i}</div>
          ))}
        </div>
        <p className="text-xs text-white/35">Trusted by 12,000+ event planners</p>
      </div>
    </div>
  );
}

/* ── Login page ────────────────────────────────────────────────────────────── */
export default function Login() {
  const { login, socialLogin, loading } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/dashboard";

  const [form,   setForm]   = useState({ email:"", password:"", remember:false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState("");

  const set = f => e => {
    const v = e.target.type==="checkbox" ? e.target.checked : e.target.value;
    setForm(p=>({...p,[f]:v}));
    if(errors[f]) setErrors(p=>({...p,[f]:""}));
    setApiErr("");
  };

  const validate = () => {
    const e={};
    if(!form.email||!/\S+@\S+\.\S+/.test(form.email)) e.email="Valid email required.";
    if(!form.password||form.password.length<6)         e.password="Minimum 6 characters.";
    return e;
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    const errs=validate();
    if(Object.keys(errs).length){setErrors(errs);return;}
    setErrors({}); setApiErr("");
    try { await login(form); navigate(from,{replace:true}); }
    catch(err){ setApiErr(err.message||"Login failed. Please try again."); }
  };

  const handleSocial = async (provider) => {
    try { await socialLogin(provider); navigate(from,{replace:true}); }
    catch { setApiErr("Social login failed. Please try again."); }
  };

  return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[120px] pointer-events-none"/>
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/12 blur-[120px] pointer-events-none"/>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>

      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
        style={{background:"rgba(13,1,24,0.88)",backdropFilter:"blur(24px)"}}>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"/>

        <div className="grid lg:grid-cols-2 min-h-[580px]">
          <BrandPanel/>

          {/* Form side */}
          <div className="flex flex-col justify-center px-8 py-10">
            {/* Mobile logo */}
            <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}}>🎉</div>
              <span className="text-lg font-extrabold text-white">Event<span style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ora</span></span>
            </Link>

            <h1 className="text-2xl font-extrabold text-white mb-1.5">Sign in to your account</h1>
            <p className="text-sm text-white/40 mb-7">Enter your credentials to continue</p>

            {/* API error */}
            {apiErr && <div className="mb-5 px-4 py-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-sm text-rose-400 flex items-center gap-2">{apiErr}</div>}

            {/* Social */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button type="button" onClick={()=>handleSocial("Google")} disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 text-sm font-medium text-white/55 hover:text-white transition-all duration-200 disabled:opacity-60">
                <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#EA4335" d="M5.27 9.77A7.18 7.18 0 0112 4.8c1.73 0 3.29.62 4.51 1.64l3.37-3.37A12 12 0 000 12c0 1.99.49 3.86 1.35 5.51l3.92-3.04z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.68-2.85A7.18 7.18 0 0112 19.2a7.18 7.18 0 01-6.72-4.69L1.36 17.5A12 12 0 0012 24z"/><path fill="#4A90D9" d="M23.76 12.27c0-.84-.07-1.65-.2-2.43H12v4.6h6.6a5.64 5.64 0 01-2.44 3.7l3.68 2.85C21.9 19.1 23.76 15.93 23.76 12.27z"/><path fill="#FBBC05" d="M5.28 14.51A7.28 7.28 0 014.8 12c0-.87.15-1.72.48-2.5L1.36 6.49A12.05 12.05 0 000 12c0 1.93.46 3.76 1.36 5.5l3.92-3z"/></svg>
                Google
              </button>
              <button type="button" onClick={()=>handleSocial("GitHub")} disabled={loading}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 text-sm font-medium text-white/55 hover:text-white transition-all duration-200 disabled:opacity-60">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/80" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </button>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-white/8"/><span className="text-xs text-white/25 uppercase tracking-widest">or</span><div className="flex-1 h-px bg-white/8"/>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="l-email" required>Email Address</Label>
                <input id="l-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" className={iCls(errors.email)}/>
                <Err msg={errors.email}/>
              </div>
              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="l-pw" required>Password</Label>
                  <Link to="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input id="l-pw" type={showPw?"text":"password"} value={form.password} onChange={set("password")} placeholder="••••••••" autoComplete="current-password" className={`${iCls(errors.password)} pr-11`}/>
                  <button type="button" onClick={()=>setShowPw(v=>!v)} aria-label={showPw?"Hide":"Show"} className="absolute inset-y-0 right-3.5 flex items-center text-white/25 hover:text-white/60 focus-visible:outline-none">{showPw?<EyeOff/>:<EyeOn/>}</button>
                </div>
                <Err msg={errors.password}/>
              </div>
              {/* Remember me */}
              <div className="flex items-center gap-3">
                <button type="button" role="checkbox" aria-checked={form.remember} onClick={()=>setForm(p=>({...p,remember:!p.remember}))}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${form.remember?"border-transparent":"border-white/15 bg-white/5 hover:border-white/30"}`}
                  style={form.remember?{background:"linear-gradient(135deg,#7c3aed,#ec4899)"}:{}}>
                  {form.remember&&<svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="2,6 5,9 10,3"/></svg>}
                </button>
                <span className="text-sm text-white/40 cursor-pointer select-none" onClick={()=>setForm(p=>({...p,remember:!p.remember}))}>Remember me for 30 days</span>
              </div>
              {/* Submit */}
              <button type="submit" disabled={loading}
                className="relative overflow-hidden group w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70"
                style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.4)"}}>
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"/>
                {loading?<span className="flex items-center justify-center gap-2"><Spinner/>Signing in…</span>:"Sign In →"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/35">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">Create one free →</Link>
            </p>
            <p className="mt-4 text-center text-xs text-white/20">🔒 Protected by 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}