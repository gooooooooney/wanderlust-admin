import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { CellWithHtmlProps } from "./types"

export const EditableCell: React.FC<CellWithHtmlProps> = ({ getValue, row: { index }, column: { id }, table, className }) => {
  const initialValue = getValue() as string
  const [value, setValue] = useState(initialValue)
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Input
      className={cn("border-none shadow-none hover:bg-gray-100 dark:hover:bg-gray-700", className)}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
    />

  )
}