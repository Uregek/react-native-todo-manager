import { ReactNode, createContext, useCallback, useContext } from "react";
import { useImmer } from "use-immer";
import uuid from "react-native-uuid";

import { TodoType } from "@/todo";

import { ListType } from "../model";

type ListContextValue = [
  { lists: ListType[] },
  { createList: (text: string) => void; saveTodos: (id: string, todos: TodoType[]) => void; removeList: (removeId: string) => void; renameList: (renameId: string, text: string) => void }
];

const ListContext = createContext<ListContextValue>({} as ListContextValue);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useImmer<ListType[]>([
    {
      id: uuid.v4() as string,
      text: "Example todo list",
      todos: [
        { id: uuid.v4() as string, text: "Click to solve", solved: false },
        { id: uuid.v4() as string, text: "Swipe right to rename", solved: false },
        { id: uuid.v4() as string, text: "Swipe left to delete", solved: true },
      ],
    },
  ]);

  const createList: ListContextValue[1]["createList"] = useCallback((text) => {
    if (text !== "") {
      setLists((prev) => {
        prev.unshift({ id: uuid.v4() as string, text, todos: [] });
      });
    }
  }, []);

  const saveTodos: ListContextValue[1]["saveTodos"] = useCallback((saveId, todos) => {
    setLists((prev) => {
      const list = prev.find(({ id }) => id === saveId);
      if (list) {
        list.todos = todos;
      }
    });
  }, []);

  const removeList: ListContextValue[1]["removeList"] = useCallback((removeId) => {
    setLists((prev) => prev.filter(({ id }) => id !== removeId));
  }, []);

  const renameList: ListContextValue[1]["renameList"] = useCallback((renameId, text) => {
    if (text !== "") {
      setLists((prev) => {
        const list = prev.find(({ id }) => id === renameId);
        if (list) {
          list.text = text;
        }
      });
    }
  }, []);

  const value: ListContextValue = [{ lists }, { createList, saveTodos, removeList, renameList }];

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useListContext = () => useContext(ListContext);
