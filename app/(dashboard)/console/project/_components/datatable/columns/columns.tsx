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
import { Banner } from "@prisma/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { EditableCell } from "./editable-cell";
import { ImageCell } from "./image-cell";
import { ActionsCell } from "./actions-cell";

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
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "title",
    header: "Title (editable)",
    cell: (props) => <EditableCell className="w-26" {...props} />,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (props) => <EditableCell {...props} className="text-sm text-muted-foreground" />
  },
  {
    accessorKey: "imageUrl",
    header: "thumbnail",
    cell: ImageCell,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell
  },
];
