import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GithubProvider } from "./context/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </StrictMode>
);
