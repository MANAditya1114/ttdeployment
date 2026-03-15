import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* ⭐ ADD THIS */
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <App />

    {/* ⭐ GLOBAL TOAST SYSTEM */}
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#111827",
          color: "#fff"
        }
      }}
    />

  </React.StrictMode>
);