import { InvalidTodoError } from "../../domain/errors/InvalidRepositoryError";
import { UnexpectedError } from "../../domain/errors/UnexpectedError";
import { Todo } from "../../domain/models/Todo";
import { FetchTodo } from "../../domain/use-cases/FetchTodo";
import { HttpClientProtocol, HttpStatusCode } from "../protocols/http/HttpClientProtocol";

interface RemoteTodo {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export class RemoteFetchTodo implements FetchTodo {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClientProtocol
  ) { }

  async fetch(): Promise<Todo[]> {
    const httpResponse = await this.httpClient.request({
      method: "GET",
      url: this.url,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return this.adapt(httpResponse.body as RemoteTodo[])
      case HttpStatusCode.notFound:
        throw new InvalidTodoError();
      default:
        throw new UnexpectedError();
    }
  }

  private adapt(httpResponse: RemoteTodo[]): Todo[] {
    return httpResponse.map(todo => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      done: todo.done,
    }));
  }
}