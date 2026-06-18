import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NO_SHELL = ["/login", "/register", "/auth", "/dashboard"];

export default function RootLayout() {
  const { pathname } = useLocation();
  const bare = NO_SHELL.some(p => pathname.startsWith(p));

  if (bare) return <Outlet />;

  return (
    <div className="min-h-screen bg-[#0d0118] flex flex-col">
      <Header />
      <main className="flex-1 pt-[70px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}