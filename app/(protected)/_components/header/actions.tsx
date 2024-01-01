import { ModeToggle } from "./mode-toggle"
import { UserButton } from "./user-button"

export const Actions = () => {
  return (
    <div className="flex flex-1 items-center justify-end gap-x-4">
      <ModeToggle />
      <UserButton />
    </div>
  )
}