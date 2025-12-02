import { createContext } from "react";

export interface WinnerContextType {
  winner: boolean | null;
  setWinner: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const WinnerContext = createContext<WinnerContextType>({} as WinnerContextType);
