import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/globals.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      {/* 🔴 CUKUP TAMBAHKAN basename DI BARIS INI 🔴 */}
      <BrowserRouter basename="/web-sixlabs">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
