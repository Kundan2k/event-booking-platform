import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout
import RootLayout from "../layout/RootLayout";

// Pages
import Home from "../pages/Home";
import Events from "../pages/Events";
import EventDetail from "../pages/EventDetail";
import Booking from "../pages/Booking";
import Confirmation from "../pages/Confirmation";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

/**
 * router/index.jsx
 *
 * Uses the Data Router API (createBrowserRouter) introduced in v6.4+.
 * Every user-facing page is nested under RootLayout, which renders
 * the shared Header, Footer, and <Outlet /> for the active page.
 *
 * Route map:
 *   /                  → Home
 *   /events            → Events (browse all)
 *   /events/:id        → EventDetail (single event)
 *   /events/:id/book   → Booking (seat selection & checkout)
 *   /confirmation/:ref → Confirmation (post-booking receipt)
 *   /dashboard         → Dashboard  (my tickets — auth required)
 *   /login             → Login
 *   /register          → Register
 *   *                  → 404 NotFound
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,        // Shared shell: Header + Outlet + Footer
    errorElement: <NotFound />,     // Catches loader/action errors at this level
    children: [
      // ── Public routes ────────────────────────────────────────────────────
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/:id",
        element: <EventDetail />,
      },
      {
        path: "events/:id/book",
        element: <Booking />,
      },
      {
        path: "confirmation/:ref",
        element: <Confirmation />,
      },

      // ── Auth pages (own layout via RootLayout with minimal chrome) ───────
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // ── Protected route (auth guard lives inside Dashboard) ───────────────
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // ── Legacy redirect example ───────────────────────────────────────────
      {
        path: "my-tickets",
        element: <Navigate to="/dashboard" replace />,
      },

      // ── Catch-all 404 ────────────────────────────────────────────────────
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;