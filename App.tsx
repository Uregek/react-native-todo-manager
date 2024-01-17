import "react-native-gesture-handler";

import { useFontsCustom } from "@/shared/hooks";
import { Providers } from "@/shared/providers";

import { Navigation } from "./Navigation";

const App = () => {
  useFontsCustom();

  return (
    <Providers>
      <Navigation />
    </Providers>
  );
};

export default App;
