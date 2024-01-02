import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { HTMLInputTypeAttribute, useEffect, useState } from "react"
import { CellWithHtmlProps } from "./datatable/types"

export const EditableCell: React.FC<CellWithHtmlProps & { handleBlur?: () => void, type?: HTMLInputTypeAttribute }> = (
  {
    getValue,
    row: { index },
    column: { id },
    table,
    className,
    handleBlur,
    type
  }) => {
  const initialValue = getValue() as string
  const [value, setValue] = useState(initialValue)
  const onBlur = () => {
    handleBlur?.()
    table.options.meta?.updateData(index, id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Input
      type={type}
      className={cn("border-none shadow-none hover:bg-gray-100 dark:hover:bg-gray-700", className)}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
    />
  )
}