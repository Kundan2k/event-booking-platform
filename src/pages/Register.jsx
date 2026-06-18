import { useState } from "react";
import { Link } from "react-router-dom";

const FIELDS = [
  {
    id: "name", label: "Full Name", type: "text",
    placeholder: "Rahul Sharma", autoComplete: "name",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "email", label: "Email Address", type: "email",
    placeholder: "you@example.com", autoComplete: "email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "phone", label: "Phone Number", type: "tel",
    placeholder: "+91 98765 43210", autoComplete: "tel",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .97h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
];

function StrengthBar({ password }) {
  const calc = (p) => {
    let s = 0;
    if (p.length >= 6)  s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const score = password ? calc(password) : 0;
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = ["", "#f43f5e", "#fb923c", "#facc15", "#34d399", "#a78bfa"];
  return password ? (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300" style={{ background: i <= score ? colors[score] : "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <p className="text-[10px] font-semibold" style={{ color: colors[score] }}>{labels[score]}</p>
    </div>
  ) : null;
}

export default function Register() {
  const [form, setForm]     = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [show, setShow]     = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                        e.name    = "Full name is required.";
    if (!form.email)                              e.email   = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))   e.email   = "Enter a valid email.";
    if (!form.phone)                              e.phone   = "Phone number is required.";
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.password)                           e.password = "Password is required.";
    else if (form.password.length < 6)            e.password = "Minimum 6 characters.";
    if (!form.confirm)                            e.confirm  = "Please confirm your password.";
    else if (form.confirm !== form.password)      e.confirm  = "Passwords do not match.";
    if (!agreed)                                  e.agreed   = "You must accept the terms.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  };

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${
      errors[field]
        ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/30"
        : "border-white/10 focus:border-violet-500/60 focus:ring-violet-500/30"
    }`;

  if (done) return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px]" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/15 blur-[120px]" />
      <div className="relative text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-2xl shadow-violet-500/40">🎉</div>
        <h2 className="text-2xl font-extrabold text-white mb-2">Account Created!</h2>
        <p className="text-sm text-white/45 mb-8">Welcome to Eventora, {form.name.split(" ")[0]}! Your account is ready.</p>
        <Link to="/login" className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400" style={{ background: "linear-gradient(to right,#7c3aed,#ec4899)", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}>
          Go to Login →
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/15 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg" aria-label="Eventora home">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-lg shadow-violet-500/40">🎉</div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Event<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">ora</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40">

          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-600/8 to-transparent pointer-events-none" />

          <div className="relative px-8 pt-10 pb-8">

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1.5">Create your account ✨</h1>
              <p className="text-sm text-white/40">Join 12,000+ happy customers on Eventora.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* Text fields */}
              {FIELDS.map(({ id, label, type, placeholder, autoComplete, icon }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-semibold text-white/45 tracking-wide uppercase mb-2">{label}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">{icon}</div>
                    <input
                      id={id} type={type} value={form[id]}
                      onChange={set(id)} placeholder={placeholder}
                      autoComplete={autoComplete}
                      className={inputClass(id)}
                    />
                  </div>
                  {errors[id] && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><span aria-hidden="true">⚠</span>{errors[id]}</p>}
                </div>
              ))}

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-white/45 tracking-wide uppercase mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                  </div>
                  <input
                    id="password" type={show.password ? "text" : "password"}
                    value={form.password} onChange={set("password")}
                    placeholder="Min. 6 characters" autoComplete="new-password"
                    className={`${inputClass("password")} pr-11`}
                  />
                  <button type="button" onClick={() => setShow(p => ({ ...p, password: !p.password }))} aria-label={show.password ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-3.5 flex items-center text-white/25 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none">
                    {show.password
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                  </button>
                </div>
                <StrengthBar password={form.password} />
                {errors.password && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><span aria-hidden="true">⚠</span>{errors.password}</p>}
              </div>

              {/* Confirm password */}
              <div>
                <label htmlFor="confirm" className="block text-xs font-semibold text-white/45 tracking-wide uppercase mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/25">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M9 12l2 2 4-4" /><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" /></svg>
                  </div>
                  <input
                    id="confirm" type={show.confirm ? "text" : "password"}
                    value={form.confirm} onChange={set("confirm")}
                    placeholder="Re-enter your password" autoComplete="new-password"
                    className={`${inputClass("confirm")} pr-11`}
                  />
                  <button type="button" onClick={() => setShow(p => ({ ...p, confirm: !p.confirm }))} aria-label={show.confirm ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-3.5 flex items-center text-white/25 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none">
                    {show.confirm
                      ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                  </button>
                </div>
                {/* Match indicator */}
                {form.confirm && form.password && (
                  <p className={`mt-1.5 text-xs flex items-center gap-1 ${form.confirm === form.password ? "text-emerald-400" : "text-rose-400"}`}>
                    <span aria-hidden="true">{form.confirm === form.password ? "✓" : "⚠"}</span>
                    {form.confirm === form.password ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
                {errors.confirm && !form.confirm && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><span aria-hidden="true">⚠</span>{errors.confirm}</p>}
              </div>

              {/* Terms checkbox */}
              <div className="pt-1">
                <div className="flex items-start gap-3">
                  <button
                    type="button" role="checkbox" aria-checked={agreed}
                    onClick={() => { setAgreed(v => !v); if (errors.agreed) setErrors(p => ({ ...p, agreed: "" })); }}
                    className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${agreed ? "border-transparent bg-gradient-to-br from-violet-600 to-fuchsia-500" : errors.agreed ? "border-rose-500/70 bg-white/5" : "border-white/15 bg-white/5 hover:border-white/30"}`}
                  >
                    {agreed && <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true"><polyline points="2,6 5,9 10,3" /></svg>}
                  </button>
                  <span className="text-sm text-white/40 leading-snug select-none cursor-pointer" onClick={() => { setAgreed(v => !v); if (errors.agreed) setErrors(p => ({ ...p, agreed: "" })); }}>
                    I agree to the{" "}
                    <Link to="/terms" className="text-violet-400 hover:text-violet-300 transition-colors" onClick={e => e.stopPropagation()}>Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-violet-400 hover:text-violet-300 transition-colors" onClick={e => e.stopPropagation()}>Privacy Policy</Link>
                  </span>
                </div>
                {errors.agreed && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 ml-8"><span aria-hidden="true">⚠</span>{errors.agreed}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit" disabled={loading}
                  className="relative overflow-hidden group w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(to right,#7c3aed,#ec4899)", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}
                >
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Creating account…
                    </span>
                  ) : "Create Account"}
                </button>
              </div>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-white/35">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:underline">
                Sign in →
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          Protected by 256-bit SSL encryption 🔒
        </p>
      </div>
    </div>
  );
}