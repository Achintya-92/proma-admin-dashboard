import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { AuthProvider } from "./auth/context/AuthContext.jsx";
import { ProdProvider } from "./products/context/ProdContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <ProdProvider>
      <App />
    </ProdProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);