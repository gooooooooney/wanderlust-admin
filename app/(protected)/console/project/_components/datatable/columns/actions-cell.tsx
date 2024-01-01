import { Button } from "@/components/ui/button";
import { Cell } from "../types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Copy, TrashIcon } from "lucide-react";

export const ActionsCell: Cell = ({ row, table }) => {
  const banner = row.original;

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
          onClick={() => navigator.clipboard.writeText(banner.id)}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            table.options.meta?.deleteData(row.index);
          }}
        >
          <TrashIcon className="h-4 w-4 mr-2" />
          Delete banner
        </DropdownMenuItem>
        {/* <DropdownMenuItem>View banner details</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}