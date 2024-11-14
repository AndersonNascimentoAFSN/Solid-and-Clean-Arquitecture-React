import { Todo } from "../models/Todo";

export interface FetchTodo {
  fetch(): Promise<Todo[]>;
}