import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { Theme } from "tamagui";

import { ThemeType } from "../model";

type ThemeContextValue = [ThemeType, Dispatch<SetStateAction<ThemeType>>];

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value: ThemeContextValue = useState<ThemeType>("light");
  return (
    <ThemeContext.Provider value={value}>
      <Theme name={value[0]}>{children}</Theme>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
