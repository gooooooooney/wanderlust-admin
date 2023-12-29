import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Banner } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { EditableCell } from "./editable-cell";
import { ImageCell } from "./image-cell";
import { ActionsCell } from "./actions-cell";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { ImageUrl } from "./image-url";

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
    accessorKey: "imageUrl",
    header: "Link",
    cell: ImageUrl,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (props) => (
      <EditableCell {...props} className="text-sm text-muted-foreground" />
    ),
  },
  {
    accessorKey: "imageSrc",
    header: "thumbnail",
    cell: ImageCell,
  },
  {
    id: "delete",
    header: "",
    cell: ({ row, table }) => (
      <Button
        variant="destructive"
        onClick={() => {
          table.options.meta?.deleteData(row.index);
        }}
      >
        Delete
      </Button>
    ),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ActionsCell,
  // },
];
