import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GithubProvider } from "./context/context.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

// domain
// dev-7bvmp1cy84bio5rk.us.auth0.com
// client id
// lIO1UfhPbjtRSwrSVlZeWBW8HkJIr0g1

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-7bvmp1cy84bio5rk.us.auth0.com"
      clientId="lIO1UfhPbjtRSwrSVlZeWBW8HkJIr0g1"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </StrictMode>
);
