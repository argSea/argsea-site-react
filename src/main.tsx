import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginProvider } from "./contexts/LoginContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LoginProvider>
    <App />
  </LoginProvider>
);
