import React from "react";
import ReactDOM from "react-dom/client";
import MemoryApp from "./MemoryApp";
import { WinnerProvider } from "./context/WinnerProvider";
import { ClicksProvider } from "./context/ClicksProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <ClicksProvider>
        <WinnerProvider>
          <MemoryApp />
        </WinnerProvider>
      </ClicksProvider>
  </React.StrictMode>
);
