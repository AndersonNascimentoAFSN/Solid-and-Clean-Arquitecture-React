import { Home } from "../../../presentation/pages/Home"
import { makeRemoteFetchTodo } from "../use-cases/remote-fetch-todo-factory"

export function MakeHome() {
  return (
    <Home 
      fetchTodo={makeRemoteFetchTodo()}
    />
  )
}