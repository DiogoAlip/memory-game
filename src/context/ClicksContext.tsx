import { createContext } from "react";

export interface ClicksContextType {
  clicks: number;
  setClicks: React.Dispatch<React.SetStateAction<number>>;
}

export const ClicksContext = createContext<ClicksContextType>({} as ClicksContextType);
