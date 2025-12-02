import { useState } from "react";
import { WinnerContext } from "./WinnerContext";

import { ReactNode } from "react";

export const WinnerProvider = ({ children }: { children: ReactNode }) => {
  const [winner, setWinner] = useState<boolean | null>(null);
  return (
    <WinnerContext.Provider value={{ winner, setWinner }}>
      {children}
    </WinnerContext.Provider>
  );
};
