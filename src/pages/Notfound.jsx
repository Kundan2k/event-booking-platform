import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0118] flex items-center justify-center px-4 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/15 blur-[120px] pointer-events-none"/>
      <div aria-hidden="true" className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-pink-700/10 blur-[120px] pointer-events-none"/>
      <div className="relative text-center max-w-md">
        <div className="text-8xl mb-6 select-none" aria-hidden="true">🎭</div>
        <h1 className="text-7xl font-extrabold mb-3" style={{background:"linear-gradient(to right,#a78bfa,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-sm text-white/40 mb-8 leading-relaxed">
          Looks like this page wandered off to celebrate somewhere. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{background:"linear-gradient(to right,#7c3aed,#ec4899)",boxShadow:"0 0 20px rgba(124,58,237,0.4)"}}>
            Back to Home
          </Link>
          <Link to="/events" className="px-8 py-3.5 rounded-xl text-sm font-bold text-white/55 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200">
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
}