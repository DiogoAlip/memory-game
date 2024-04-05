import { useState } from "react";
import { WinnerContext } from "./WinnerContext";

export const WinnerProvider = ({ children }) => {
  const [winner, setWinner] = useState(null);
  return (
    <WinnerContext.Provider value={{ winner, setWinner }}>
      {children}
    </WinnerContext.Provider>
  );
};
