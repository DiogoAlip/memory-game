import React from "react";
import ReactDOM from "react-dom/client";
import MemoryApp from "./MemoryApp";
import { WinnerProvider } from "./context/WinnerProvider";
import { ClicksProvider } from "./context/ClicksProvider";
import { ConfigProvider } from "./context/ConfigProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider>
      <ClicksProvider>
        <WinnerProvider>
          <MemoryApp />
        </WinnerProvider>
      </ClicksProvider>
    </ConfigProvider>
  </React.StrictMode>
);
