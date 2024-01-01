
import { cn } from "@/lib/utils"
import { Menu } from "./menu"
import { navigation } from "@/lib/navigation"
import { Container } from "./container"


export default function Sidebar() {

  return (
    <Container>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <Menu />
          </li>
        </ul>
      </nav>
      
    </Container>
  )
}
