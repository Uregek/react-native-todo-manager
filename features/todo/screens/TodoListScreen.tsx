import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";

import { useListContext } from "@/list";

import { TodoProvider } from "../providers";
import { TodoList } from "../views";

type TodoListScreenNavigationProps = StackScreenProps<StackParamList, "TodoList">;

export const TodoListScreen: FC<TodoListScreenNavigationProps> = ({ navigation, route }) => {
  const { todoListId } = route.params;
  const [{ lists }] = useListContext();

  const currentList = lists.find(({ id }) => id === todoListId);
  return (
    <TodoProvider todoList={currentList}>
      <TodoList />
    </TodoProvider>
  );
};
