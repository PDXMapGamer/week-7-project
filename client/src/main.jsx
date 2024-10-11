import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// TODO need a routing provider here
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
