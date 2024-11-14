import { RemoteFetchTodo } from "../../../data/use-cases/RemoteFetchTodo";
import { FetchTodo } from "../../../domain/use-cases/FetchTodo";
import { makeApiUrl } from "../http/api-url-factory";
import { makeFetchHttpClientAdapter } from "../http/fetch-http-client-adapter-factory";


export const makeRemoteFetchTodo = (): FetchTodo => {
  return new RemoteFetchTodo(
    makeApiUrl("todos"),
    makeFetchHttpClientAdapter()
  );
};
