import { ThemeType } from "../model";

export const invertTheme = (theme: ThemeType) => (theme === "dark" ? "light" : "dark");
