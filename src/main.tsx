import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/base.css";
import "./styles/interactions.css";
import "./styles/direction.css";
import "./styles/v3.css";
import "./styles/refinements.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
