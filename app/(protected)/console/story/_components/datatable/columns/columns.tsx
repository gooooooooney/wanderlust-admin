import { Checkbox } from "@/components/ui/checkbox";

import {  Tag, VirtualTour } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { EditableCell } from "./editable-cell";
import { ActionsCell } from "./actions-cell";
import { LinkPreview } from "./link-preview";
import { ImageCell } from "./image-cell";
import { Tags } from "../../tags";

export const columns: ColumnDef<VirtualTour & {tags: Tag[] }>[] = [
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
    size: 20,
    cell: (props) => (
      <EditableCell type="number" {...props} className="text-sm text-muted-foreground w-20" />
    ),
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: LinkPreview,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (props) => (
      <EditableCell {...props} className="text-sm text-muted-foreground" />
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: (props) => (
      <EditableCell {...props} className="text-sm text-muted-foreground" />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (props) => (
      <EditableCell {...props} className="text-sm text-muted-foreground" />
    ),
  },
  {
    accessorKey: "tags",
    header: "Tag",
    cell: (props) => {
      return <Tags className="w-40 gap-2" tags={props.getValue() as any || []} />
    },
  },
  {
    accessorKey: "coverSrc",
    header: "Cover",
    cell: ImageCell,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
];
