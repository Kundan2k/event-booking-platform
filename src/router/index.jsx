/**
 * Complete router/index.jsx with auth routes + protected routes.
 * Copy this content into src/router/index.jsx
 */
import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout      from "../layout/RootLayout";
import ProtectedRoute  from "../components/ProtectedRoute";

/* Public pages */
import Home            from "../pages/Home";
import Events          from "../pages/Events";
import EventDetail     from "../pages/EventDetail";
import Packages        from "../pages/Packages";
import About           from "../pages/About";
import Contact         from "../pages/Contact";
import Booking         from "../pages/Booking";
import NotFound        from "../pages/NotFound";

/* Auth pages — no shell */
import Login           from "../pages/Login";
import Register        from "../pages/Register";
import ForgotPassword  from "../pages/ForgotPassword";
import ResetPassword   from "../pages/ResetPassword";

/* Protected pages */
import Dashboard       from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      /* ── Public ────────────────────────────────────────────────── */
      { index: true,              element: <Home />        },
      { path: "events",           element: <Events />      },
      { path: "events/:id",       element: <EventDetail /> },
      { path: "packages",         element: <Packages />    },
      { path: "about",            element: <About />       },
      { path: "contact",          element: <Contact />     },
      { path: "booking",          element: <Booking />     },

      /* ── Auth (no Header/Footer — handled by RootLayout) ───────── */
      { path: "login",            element: <Login />           },
      { path: "register",         element: <Register />        },
      { path: "forgot-password",  element: <ForgotPassword />  },
      { path: "reset-password",   element: <ResetPassword />   },

      /* ── Legacy redirects ───────────────────────────────────────── */
      { path: "auth",             element: <Navigate to="/login" replace /> },
      { path: "signup",           element: <Navigate to="/register" replace /> },

      /* ── Protected ─────────────────────────────────────────────── */
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },

      /* ── 404 ────────────────────────────────────────────────────── */
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;