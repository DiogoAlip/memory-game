import { useState } from "react";
import { ConfigContext } from "./ConfigContext";

export const ConfigProvider = ({ children }) => {
  const [configBoolean, setConfigBoolean] = useState(false);
  return (
    <ConfigContext.Provider value={{ configBoolean, setConfigBoolean }}>
      {children}
    </ConfigContext.Provider>
  );
};
