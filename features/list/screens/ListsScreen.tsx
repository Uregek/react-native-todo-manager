import { FC } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { Lists } from "../views";

type ListsScreenNavigationProps = StackScreenProps<StackParamList, "Home">;

export const ListsScreen: FC<ListsScreenNavigationProps> = ({ navigation, route }) => {
  return <Lists />;
};
