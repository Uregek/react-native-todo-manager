import { FC, ReactNode } from "react";
import { TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v2";

import { ListProvider } from "@/list";
import { ThemeProvider } from "@/theme";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider>
        <ListProvider>{children}</ListProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
};
