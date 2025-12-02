import { createContext } from "react";

export interface ConfigContextType {
  configBoolean: boolean;
  setConfigBoolean: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfigContext = createContext<ConfigContextType>({} as ConfigContextType);
