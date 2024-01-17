import { TodoType } from "@/todo";

export interface ListType {
  id: string;
  text: string;
  todos: TodoType[];
}
