import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./components/Style/main.scss";
import App from "./components/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
