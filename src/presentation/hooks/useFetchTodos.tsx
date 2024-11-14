import { useQuery } from "@tanstack/react-query";
import { FetchTodo } from "../../domain/use-cases/FetchTodo";

export function useFetchTodos(fetchTodo: FetchTodo) {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = fetchTodo.fetch();
      return response;
    }
  })
}