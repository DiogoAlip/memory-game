import { useState } from "react";
import { ClicksContext } from "./ClicksContext";

export const ClicksProvider = ({ children }) => {
  const [clicks, setClicks] = useState(0);
  return (
    <ClicksContext.Provider value={{ clicks, setClicks }}>
      {children}
    </ClicksContext.Provider>
  );
};
