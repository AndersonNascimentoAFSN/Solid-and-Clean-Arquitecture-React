import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MakeHome } from "../factories/view/home-factory";
import { Provider } from "../providers";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MakeHome />,
    },
  ])

  return (
    <>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}