import { describe, it, expect, vi, Mock } from 'vitest'

import { InvalidTodoError } from "../../domain/errors/InvalidRepositoryError";
import { UnexpectedError } from "../../domain/errors/UnexpectedError";
import { RemoteFetchTodo } from "./RemoteFetchTodo";
import { HttpClientProtocol, HttpStatusCode } from "../protocols/http/HttpClientProtocol";

const makeHttpClientStub = () => {
  return {
    request: vi.fn()
  } as unknown as HttpClientProtocol;
};

const makeSut = (url: string) => {
  const httpClientStub = makeHttpClientStub();
  const sut = new RemoteFetchTodo(url, httpClientStub);
  return { sut, httpClientStub };
};

describe("RemoteFetchTodo", () => {
  const url = "http://test-url.com/todos";

  it("should call HttpClient with the correct URL", async () => {
    const { sut, httpClientStub } = makeSut(url);
    
    (httpClientStub.request as Mock).mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body: []
    });

    await sut.fetch();

    expect(httpClientStub.request).toHaveBeenCalledWith({
      method: "GET",
      url: url
    });
  });

  it("should return a list of todos if HttpClient returns 200", async () => {
    const { sut, httpClientStub } = makeSut(url);

    const remoteTodos = [
      { id: "1", title: "Test Todo 1", description: "Description 1", done: true },
      { id: "2", title: "Test Todo 2", description: "Description 2", done: false }
    ];

    (httpClientStub.request as Mock).mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body: remoteTodos
    });

    const todos = await sut.fetch();

    expect(todos).toEqual([
      { id: "1", title: "Test Todo 1", description: "Description 1", done: true },
      { id: "2", title: "Test Todo 2", description: "Description 2", done: false }
    ]);
  });

  it("should throw InvalidTodoError if HttpClient returns 404", async () => {
    const { sut, httpClientStub } = makeSut(url);

    (httpClientStub.request as Mock).mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound
    });

    await expect(sut.fetch()).rejects.toThrow(new InvalidTodoError());
  });

  it("should throw UnexpectedError if HttpClient returns a non-handled status code", async () => {
    const { sut, httpClientStub } = makeSut(url);

    (httpClientStub.request as Mock).mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError
    });

    await expect(sut.fetch()).rejects.toThrow(new UnexpectedError());
  });
});