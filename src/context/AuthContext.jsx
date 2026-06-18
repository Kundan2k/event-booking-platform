import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "eventora_user";

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  /* persist on change */
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else      localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = useCallback(async ({ email, password, remember }) => {
    setLoading(true); setError(null);
    await new Promise(r => setTimeout(r, 1600));
    if (password.length < 6) { setLoading(false); throw new Error("Invalid email or password."); }
    const u = {
      id: "u_" + Date.now(),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      email, phone: "+91 98765 43210",
      avatar: email[0].toUpperCase(),
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    };
    setUser(u); setLoading(false);
    if (!remember) { /* session only — clear on tab close via sessionStorage if needed */ }
    return u;
  }, []);

  const register = useCallback(async ({ name, email, phone, password }) => {
    setLoading(true); setError(null);
    await new Promise(r => setTimeout(r, 1600));
    const u = { id: "u_" + Date.now(), name, email, phone, avatar: name[0].toUpperCase(), joinedDate: "Today" };
    setUser(u); setLoading(false);
    return u;
  }, []);

  const socialLogin = useCallback(async (provider) => {
    setLoading(true); setError(null);
    await new Promise(r => setTimeout(r, 1400));
    const u = {
      id: "u_social_" + Date.now(),
      name: provider === "Google" ? "Google User" : "GitHub User",
      email: provider === "Google" ? "user@gmail.com" : "user@github.com",
      avatar: provider[0],
      provider, joinedDate: "Today",
    };
    setUser(u); setLoading(false);
    return u;
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    return { sent: true, email };
  }, []);

  const resetPassword = useCallback(async ({ token, password }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => { setUser(null); }, []);

  const updateProfile = useCallback((data) => {
    setUser(prev => ({ ...prev, ...data }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, socialLogin, forgotPassword, resetPassword, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};