import { useState } from "react";
import { ClicksContext } from "./ClicksContext";

import { ReactNode } from "react";

export const ClicksProvider = ({ children }: { children: ReactNode }) => {
  const [clicks, setClicks] = useState(0);
  return (
    <ClicksContext.Provider value={{ clicks, setClicks }}>
      {children}
    </ClicksContext.Provider>
  );
};
