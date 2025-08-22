import type { ReactNode } from "react"
import { Header } from "./header"

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container">{children}</main>
    </div>
  )
}
