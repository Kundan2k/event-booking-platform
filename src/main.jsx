/**
 * src/main.jsx — wrap everything in AuthProvider
 * Copy this content into src/main.jsx
 */
import { StrictMode } from "react";
import { createRoot }  from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider }   from "./context/AuthContext";
import router from "./router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);