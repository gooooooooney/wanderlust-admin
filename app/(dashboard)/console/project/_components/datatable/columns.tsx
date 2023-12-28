/* eslint-disable react-hooks/rules-of-hooks */
import { Description, H3, Text } from "@/components/typography/text";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Banner } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const columns: ColumnDef<Banner>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => (
      <div >{row.getValue("order")}</div>
    ),
  },
  {
    accessorKey: "title",
    header:  "Title",
    // cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
    cell: ({ getValue, row, column: { id }, table }) => {
      const initialValue = row.getValue("title") as string
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState(initialValue)
      const [isEditing, setIsEditing] = useState(false)
      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(row.index, id, value)
        setIsEditing(false)
      }
  
      // If the initialValue is changed external, sync it up with our state
      useEffect(() => {
        setValue(initialValue)
      }, [initialValue])
  
      return (
        isEditing ?
          <Input
            className="w-40"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={onBlur}
            autoFocus
          />
          :
          <Text
            className="capitalize flex items-center gap-x-2"
          >
            {value}
            <EditIcon className="ml-2 h-4 w-4 cursor-pointer" onClick={() => setIsEditing(true)} />
          </Text>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <Description>
          {row.getValue("description")}
        </Description>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: "imageUrl",
    cell: ({ row }) => (
      <div className="">
        <Image
        className="aspect-square object-cover rounded-md"
          src={row.getValue("imageUrl")}
          alt={row.getValue("description")}
          width={50}
          height={50}
        />
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
