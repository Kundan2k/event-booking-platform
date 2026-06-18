import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "Events",   to: "/events" },
  { label: "Packages", to: "/packages" },
  { label: "About",    to: "/about" },
  { label: "Contact",  to: "/contact" },
];

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(13, 1, 24, 0.75)"
          : "rgba(13, 1, 24, 0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 30px rgba(124,58,237,0.1)" : "none",
      }}
    >
      {/* Purple-pink top accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(to right, transparent, #7c3aed, #ec4899, transparent)",
      }} />

      <nav style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              boxShadow: "0 0 18px rgba(124,58,237,0.5)",
            }}>
              🎉
            </div>
            <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>
              Event<span style={{ background: "linear-gradient(to right, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ora</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul style={{ display: "flex", alignItems: "center", gap: "4px", listStyle: "none", margin: 0, padding: 0 }}
            className="hidden-mobile">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  style={{
                    position: "relative",
                    display: "block",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: isActive(to) ? "white" : "rgba(255,255,255,0.5)",
                    background: isActive(to) ? "rgba(255,255,255,0.08)" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { if (!isActive(to)) e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { if (!isActive(to)) e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  {label}
                  {isActive(to) && (
                    <span style={{
                      position: "absolute", bottom: "4px",
                      left: "50%", transform: "translateX(-50%)",
                      width: "16px", height: "2px", borderRadius: "9999px",
                      background: "linear-gradient(to right, #7c3aed, #ec4899)",
                    }} />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="hidden-mobile">
            <Link to="/login" style={{
              padding: "8px 20px", borderRadius: "10px",
              fontSize: "14px", fontWeight: 500,
              color: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              background: "transparent",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              Log in
            </Link>
            <Link to="/register" style={{
              padding: "8px 20px", borderRadius: "10px",
              fontSize: "14px", fontWeight: 700,
              color: "white", textDecoration: "none",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 30px rgba(236,72,153,0.5)"; e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.4)"; e.currentTarget.style.opacity = "1"; }}
            >
              Register
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="show-mobile"
            style={{
              width: "40px", height: "40px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              display: "none",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "5px", cursor: "pointer",
            }}
          >
            {[
              open ? "rotate(45deg) translate(4px, 4px)" : "none",
              open ? "scale(0)" : "none",
              open ? "rotate(-45deg) translate(4px, -4px)" : "none",
            ].map((transform, i) => (
              <span key={i} style={{
                display: "block", width: "20px", height: "1.5px",
                background: "white", borderRadius: "9999px",
                transition: "all 0.3s ease",
                transform,
                opacity: i === 1 && open ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "400px" : "0",
        opacity: open ? 1 : 0,
        transition: "all 0.3s ease",
        background: "rgba(13,1,24,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ padding: "8px 20px 24px" }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 16px", borderRadius: "12px",
                fontSize: "14px", fontWeight: 500,
                textDecoration: "none",
                color: isActive(to) ? "white" : "rgba(255,255,255,0.45)",
                background: isActive(to) ? "rgba(255,255,255,0.07)" : "transparent",
                marginBottom: "4px",
                transition: "all 0.2s ease",
              }}
            >
              {isActive(to) && (
                <span style={{
                  width: "3px", height: "20px", borderRadius: "9999px",
                  background: "linear-gradient(to bottom, #7c3aed, #ec4899)",
                  flexShrink: 0,
                }} />
              )}
              {label}
            </Link>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "12px" }}>
            <Link to="/login" style={{
              textAlign: "center", padding: "12px", borderRadius: "12px",
              fontSize: "14px", fontWeight: 500, textDecoration: "none",
              color: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.12)",
              transition: "all 0.2s ease",
            }}>
              Log in
            </Link>
            <Link to="/register" style={{
              textAlign: "center", padding: "12px", borderRadius: "12px",
              fontSize: "14px", fontWeight: 700, textDecoration: "none",
              color: "white",
              background: "linear-gradient(to right, #7c3aed, #ec4899)",
              boxShadow: "0 0 16px rgba(124,58,237,0.3)",
            }}>
              Register
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 1023px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}