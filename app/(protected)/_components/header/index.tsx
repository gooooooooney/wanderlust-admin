
import { Logo } from "./logo";
import { Actions } from "./actions";
import { Menu } from "./menu";

export function Header() {

  return (
    <header className="bg-background">
      <nav className=" mx-auto flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        <Menu />
        <Logo />
        <Actions />
      </nav>
    </header>
  )
}


