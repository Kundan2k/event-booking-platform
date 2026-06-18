import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { forgotPassword, loading } = useAuth();
  const [email,  setEmail]  = useState("");
  const [error,  setError]  = useState("");
  const [sent,   setSent]   = useState(false);

  const validate = () => {
    if (!email)                         return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(email))    return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    try { await forgotPassword(email); setSent(true); }
    catch { setError("Something went wrong. Please try again."); }
  };

  return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[120px] pointer-events-none"/>
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/12 blur-[120px] pointer-events-none"/>
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:"radial-gradient(circle,white 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>

      <div className="relative w-full max-w-md">
        {/* Logo */}
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
            {!sent ? (
              <>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.45)"}}>🔑</div>
                <h1 className="text-2xl font-extrabold text-white text-center mb-1.5">Forgot Password?</h1>
                <p className="text-sm text-white/40 text-center mb-7 leading-relaxed">No worries. Enter your email and we'll send you a reset link.</p>

                {error && <div className="mb-5 px-4 py-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-sm text-rose-400 flex items-center gap-2"><span>⚠</span>{error}</div>}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="fp-email" className="block text-xs font-semibold text-white/45 tracking-widest uppercase mb-2">Email Address <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </div>
                      <input
                        id="fp-email" type="email" value={email}
                        onChange={e=>{setEmail(e.target.value);setError("");}}
                        placeholder="you@example.com" autoComplete="email"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${error?"border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20":"border-white/10 focus:border-violet-500/50 focus:ring-violet-500/20"}`}
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="relative overflow-hidden group w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70"
                    style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 24px rgba(124,58,237,0.4)"}}>
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"/>
                    {loading
                      ? <span className="flex items-center justify-center gap-2"><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/></svg>Sending link…</span>
                      : "Send Reset Link →"}
                  </button>
                </form>
              </>
            ) : (
              /* ── Success state ── */
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl animate-bounce" style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",boxShadow:"0 0 32px rgba(124,58,237,0.45)",animationDuration:"2s"}}>
                  📧
                </div>
                <h2 className="text-2xl font-extrabold text-white mb-2">Check Your Email</h2>
                <p className="text-sm text-white/45 mb-2 leading-relaxed">We've sent a password reset link to</p>
                <p className="text-sm font-bold text-violet-400 mb-6">{email}</p>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 mb-6 text-left">
                  <p className="text-xs text-white/40 leading-relaxed">
                    <span className="text-white/65 font-semibold">Didn't receive it?</span> Check your spam folder or wait a few minutes. The link expires in 30 minutes.
                  </p>
                </div>
                <button onClick={()=>{setSent(false);setEmail("");}}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white/55 border border-white/12 hover:border-white/25 hover:text-white transition-all duration-200">
                  Try a different email
                </button>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-white/8 text-center">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}