import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EyeOff() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>; }
function EyeOn()  { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }

function StrengthBar({ pw }) {
  const calc = p => { let s=0; if(p.length>=6)s++; if(p.length>=10)s++; if(/[A-Z]/.test(p))s++; if(/[0-9]/.test(p))s++; if(/[^A-Za-z0-9]/.test(p))s++; return s; };
  if(!pw) return null;
  const sc=calc(pw);
  const cols=["#f43f5e","#fb923c","#facc15","#34d399","#a78bfa"];
  const lbls=["Weak","Fair","Good","Strong","Very Strong"];
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">{[1,2,3,4,5].map(i=><div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{background:i<=sc?cols[sc-1]:"rgba(255,255,255,0.08)"}}/>)}</div>
      <p className="text-[10px] font-semibold" style={{color:cols[sc-1]||"rgba(255,255,255,0.3)"}}>{sc>0?lbls[sc-1]:""}</p>
    </div>
  );
}

export default function ResetPassword() {
  const { resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "demo_token";

  const [form,   setForm]   = useState({ password:"", confirm:"" });
  const [show,   setShow]   = useState({ password:false, confirm:false });
  const [errors, setErrors] = useState({});
  const [apiErr, setApiErr] = useState("");
  const [done,   setDone]   = useState(false);

  const set = f => e => { setForm(p=>({...p,[f]:e.target.value})); if(errors[f]) setErrors(p=>({...p,[f]:""})); setApiErr(""); };

  const validate = () => {
    const e={};
    if(!form.password||form.password.length<6) e.password="Minimum 6 characters.";
    if(form.confirm!==form.password)           e.confirm ="Passwords do not match.";
    return e;
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    const errs=validate();
    if(Object.keys(errs).length){setErrors(errs);return;}
    setErrors({}); setApiErr("");
    try { await resetPassword({ token, password:form.password }); setDone(true); }
    catch(err){ setApiErr(err.message||"Reset failed. The link may have expired."); }
  };

  const iCls = err => `w-full px-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${err?"border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20":"border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"}`;

  return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[120px] pointer-events-none"/>
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/12 blur-[120px] pointer-events-none"/>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.45)"}}>🎉</div>
            <span className="text-xl font-extrabold text-white">Event<span style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ora</span></span>
          </Link>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40" style={{background:"rgba(13,1,24,0.88)",backdropFilter:"blur(24px)"}}>
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"/>
          <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-violet-600/8 to-transparent pointer-events-none"/>

          <div className="relative px-8 py-10">
            {!done ? (
              <>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.45)"}}>🔒</div>
                <h1 className="text-2xl font-extrabold text-white text-center mb-1.5">Set New Password</h1>
                <p className="text-sm text-white/40 text-center mb-7">Create a strong password for your Eventora account.</p>

                {/* Password requirements */}
                <div className="mb-5 p-4 rounded-xl bg-white/[0.03] border border-white/8">
                  <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-2">Password must have</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      {text:"6+ characters",    check:form.password.length>=6},
                      {text:"One uppercase",     check:/[A-Z]/.test(form.password)},
                      {text:"One number",        check:/[0-9]/.test(form.password)},
                      {text:"One symbol",        check:/[^A-Za-z0-9]/.test(form.password)},
                    ].map(({text,check})=>(
                      <div key={text} className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${check?"text-emerald-400":"text-white/25"}`}>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] flex-shrink-0 transition-all duration-200 ${check?"bg-emerald-500/20 border border-emerald-500/40":"bg-white/5 border border-white/10"}`}>{check?"✓":"○"}</span>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                {apiErr && <div className="mb-5 px-4 py-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-sm text-rose-400">{apiErr}</div>}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="rp-pw" className="block text-xs font-semibold text-white/45 tracking-widest uppercase mb-2">New Password <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <input id="rp-pw" type={show.password?"text":"password"} value={form.password} onChange={set("password")} placeholder="Create a strong password" autoComplete="new-password" className={`${iCls(errors.password)} pr-11`}/>
                      <button type="button" onClick={()=>setShow(p=>({...p,password:!p.password}))} className="absolute inset-y-0 right-3.5 flex items-center text-white/25 hover:text-white/60 focus-visible:outline-none">{show.password?<EyeOff/>:<EyeOn/>}</button>
                    </div>
                    <StrengthBar pw={form.password}/>
                    {errors.password&&<p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><span>⚠</span>{errors.password}</p>}
                  </div>
                  <div>
                    <label htmlFor="rp-cf" className="block text-xs font-semibold text-white/45 tracking-widest uppercase mb-2">Confirm New Password <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <input id="rp-cf" type={show.confirm?"text":"password"} value={form.confirm} onChange={set("confirm")} placeholder="Re-enter new password" autoComplete="new-password" className={`${iCls(errors.confirm)} pr-11`}/>
                      <button type="button" onClick={()=>setShow(p=>({...p,confirm:!p.confirm}))} className="absolute inset-y-0 right-3.5 flex items-center text-white/25 hover:text-white/60 focus-visible:outline-none">{show.confirm?<EyeOff/>:<EyeOn/>}</button>
                    </div>
                    {form.confirm&&form.password&&(
                      <p className={`mt-1.5 text-xs flex items-center gap-1 ${form.confirm===form.password?"text-emerald-400":"text-rose-400"}`}>
                        {form.confirm===form.password?"✓ Passwords match":"⚠ Passwords do not match"}
                      </p>
                    )}
                    {errors.confirm&&<p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><span>⚠</span>{errors.confirm}</p>}
                  </div>
                  <button type="submit" disabled={loading}
                    className="relative overflow-hidden group w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70"
                    style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.4)"}}>
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"/>
                    {loading
                      ? <span className="flex items-center justify-center gap-2"><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/></svg>Updating password…</span>
                      : "Reset Password →"}
                  </button>
                </form>
              </>
            ) : (
              /* ── Success ── */
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl animate-bounce" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 32px rgba(124,58,237,0.45)",animationDuration:"2s"}}>🎉</div>
                <h2 className="text-2xl font-extrabold text-white mb-2">Password Updated!</h2>
                <p className="text-sm text-white/45 mb-8 leading-relaxed">Your password has been reset successfully. You can now sign in with your new password.</p>
                <Link to="/login"
                  className="relative overflow-hidden group inline-block w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide text-center transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                  style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.4)"}}>
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"/>
                  Sign In Now →
                </Link>
              </div>
            )}

            {!done && (
              <div className="mt-6 pt-5 border-t border-white/8 text-center">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
                  Back to Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}