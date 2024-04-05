import React from "react";
import ReactDOM from "react-dom/client";
import MemoryApp from "./MemoryApp";
import "./index.css";
import { WinnerProvider } from "./context/WinnerProvider";
import { ClicksProvider } from "./context/ClicksProvider";
import { ConfigProvider } from "./context/ConfigProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
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
