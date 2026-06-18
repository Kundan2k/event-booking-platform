import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm]       = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!form.email)                          e.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email  = "Enter a valid email.";
    if (!form.password)                       e.password = "Password is required.";
    else if (form.password.length < 6)        e.password = "Minimum 6 characters.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => setLoading(false), 1800); // simulate API call
  };

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/15 blur-[120px] pointer-events-none" />

      {/* Dot grid */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg" aria-label="Eventora home">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-lg shadow-violet-500/40">
              🎉
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Event<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">ora</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40">

          {/* Top shimmer */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          {/* Top colour wash */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-600/8 to-transparent pointer-events-none" />

          <div className="relative px-8 pt-10 pb-8">

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1.5">
                Welcome back 👋
              </h1>
              <p className="text-sm text-white/40">
                Sign in to manage your events and bookings.
              </p>
            </div>

            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                {
                  label: "Google",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path fill="#EA4335" d="M5.27 9.77A7.18 7.18 0 0112 4.8c1.73 0 3.29.62 4.51 1.64l3.37-3.37A12 12 0 000 12c0 1.99.49 3.86 1.35 5.51l3.92-3.04z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.68-2.85A7.18 7.18 0 0112 19.2a7.18 7.18 0 01-6.72-4.69L1.36 17.5A12 12 0 0012 24z" />
                      <path fill="#4A90D9" d="M23.76 12.27c0-.84-.07-1.65-.2-2.43H12v4.6h6.6a5.64 5.64 0 01-2.44 3.7l3.68 2.85C21.9 19.1 23.76 15.93 23.76 12.27z" />
                      <path fill="#FBBC05" d="M5.28 14.51A7.28 7.28 0 014.8 12c0-.87.15-1.72.48-2.5L1.36 6.49A12.05 12.05 0 000 12c0 1.93.46 3.76 1.36 5.5l3.92-3z" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="#1877F2" className="w-4 h-4" aria-hidden="true">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 text-sm font-medium text-white/60 hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-white/25 font-medium tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-xs font-semibold text-white/45 tracking-wide uppercase mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/25" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${errors.email ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/30" : "border-white/10 focus:border-violet-500/60 focus:ring-violet-500/30"}`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><span aria-hidden="true">⚠</span> {errors.email}</p>}
              </div>

              {/* Password */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="text-xs font-semibold text-white/45 tracking-wide uppercase">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors duration-200 focus-visible:outline-none focus-visible:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/25" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={set("password")}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-11 py-3 rounded-xl bg-white/6 border text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all duration-200 ${errors.password ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/30" : "border-white/10 focus:border-violet-500/60 focus:ring-violet-500/30"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-3.5 flex items-center text-white/25 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none"
                  >
                    {showPass ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"><span aria-hidden="true">⚠</span> {errors.password}</p>}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-3 mb-7">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={form.remember}
                  onClick={() => setForm(p => ({ ...p, remember: !p.remember }))}
                  className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${form.remember ? "bg-gradient-to-br from-violet-600 to-fuchsia-500 border-transparent" : "bg-white/5 border-white/15 hover:border-white/30"}`}
                >
                  {form.remember && (
                    <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true">
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-white/45 select-none cursor-pointer" onClick={() => setForm(p => ({ ...p, remember: !p.remember }))}>
                  Remember me for 30 days
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden group w-full py-3.5 rounded-xl text-sm font-bold text-white tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(to right, #7c3aed, #ec4899)", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}
              >
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign In"}
              </button>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-white/35">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:underline">
                Create one free →
              </Link>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-white/20">
          By signing in you agree to our{" "}
          <Link to="/terms" className="hover:text-white/50 underline transition-colors">Terms</Link>
          {" & "}
          <Link to="/privacy" className="hover:text-white/50 underline transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}