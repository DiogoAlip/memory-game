import { useState } from "react";
import { ConfigContext } from "./ConfigContext";

import { ReactNode } from "react";

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [configBoolean, setConfigBoolean] = useState(false);
  return (
    <ConfigContext.Provider value={{ configBoolean, setConfigBoolean }}>
      {children}
    </ConfigContext.Provider>
  );
};
