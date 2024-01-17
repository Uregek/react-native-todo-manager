import { Moon, Sun } from "@tamagui/lucide-icons";
import { Button, Stack } from "tamagui";

import { useThemeContext } from "../providers";
import { invertTheme } from "../shared";

export const ToggleTheme = () => {
  const [theme, setTheme] = useThemeContext();

  return (
    <Button style={{ margin: 10 }} chromeless onPress={() => setTheme(invertTheme)}>
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
};
