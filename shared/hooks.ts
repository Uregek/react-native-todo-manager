import { useFonts } from "expo-font";

export const useFontsCustom = () => {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    InterBold: require("../assets/fonts/InterBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
};
