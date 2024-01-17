import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import uuid from "react-native-uuid";
import { useIsFocused } from "@react-navigation/native";

import { ListType, useListContext } from "@/list";

import { TodoType } from "../model";

type TodoContextValue = [
  { todos: TodoType[]; title: string; totalCount: number; solvedCount: number },
  { addTodo: (text: string) => void; removeTodo: (removeId: string) => void; renameTodo: (renameId: string, text: string) => void; toggleSolved: (solveId: string) => void }
];

export const TodoContext = createContext<TodoContextValue>({} as TodoContextValue);

export const TodoProvider = ({ children, todoList }: { children: ReactNode; todoList?: ListType }) => {
  const [, { saveTodos }] = useListContext();

  const [todos, setTodos] = useImmer<TodoType[]>(todoList?.todos || [{ id: uuid.v4() as string, text: "Click to solve", solved: false }]);

  const focused = useIsFocused();

  useEffect(() => {
    if (!focused && todoList) {
      saveTodos(todoList?.id, todos);
    }
  }, [focused]);

  const solvedCount = useMemo(() => todos.filter(({ solved }) => solved).length, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text !== "") {
      setTodos((prev) => {
        prev.unshift({ id: uuid.v4() as string, text, solved: false });
      });
    }
  }, []);

  const removeTodo = useCallback((removeId: string) => {
    setTodos((prev) => prev.filter(({ id }) => id !== removeId));
  }, []);

  const renameTodo = useCallback((renameId: string, text: string) => {
    if (text !== "") {
      setTodos((prev) => {
        const todo = prev.find(({ id }) => id === renameId);
        if (todo) {
          todo.text = text;
        }
      });
    }
  }, []);

  const toggleSolved = useCallback((solveId: string) => {
    setTodos((prev) => {
      const todo = prev.find(({ id }) => id === solveId);
      if (todo) {
        todo.solved = !todo.solved;
      }
    });
  }, []);

  const value: TodoContextValue = [
    { todos, title: todoList?.text || "Todo List", totalCount: todos.length, solvedCount },
    { addTodo, removeTodo, renameTodo, toggleSolved },
  ];

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
