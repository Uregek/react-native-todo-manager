import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "tamagui";
import { StatusBar } from "expo-status-bar";

import { invertTheme, ToggleTheme, useThemeContext } from "@/theme";
import { ListsScreen } from "@/list";
import { TodoListScreen } from "@/todo";

const Stack = createStackNavigator<StackParamList>();

export const Navigation = () => {
  const tamaguiTheme = useTheme();
  const [theme] = useThemeContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyle: {
            backgroundColor: tamaguiTheme.background.val,
          },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: tamaguiTheme.background.val },
          headerTitleStyle: { color: theme === "light" ? "#000" : "#fff" },
          headerRight: ToggleTheme,
        }}
      >
        <Stack.Screen name="Home" options={{ headerTitle: "Your Lists" }} component={ListsScreen} />
        <Stack.Screen name="TodoList" options={{ headerTitle: "Todo List" }} component={TodoListScreen} />
      </Stack.Navigator>
      <StatusBar style={invertTheme(theme)} />
    </NavigationContainer>
  );
};
