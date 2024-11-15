import { ReactNode } from "react";
import { Providers } from "./Providers";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  )
}