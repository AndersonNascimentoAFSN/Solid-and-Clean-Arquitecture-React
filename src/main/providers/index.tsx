import { MakeHome } from "../factories/view/home-factory";
import { Providers } from "./Providers";

export function Provider() {
  return (
    <Providers>
      <MakeHome />
    </Providers>
  )
}