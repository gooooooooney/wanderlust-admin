import { Button } from "@/components/ui/button";
import { Cell } from "../types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Copy, TrashIcon } from "lucide-react";
import { EditData } from "../editData";

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
          asChild
        >
          <Button onClick={() => navigator.clipboard.writeText(banner.id)} variant="ghost" className='w-full justify-start'>
            <Copy className="h-4 w-4 mr-2" />
            Copy ID
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
        >
          <Button onClick={() => {
            table.options.meta?.deleteData(row.index);
          }} variant="ghost" className='w-full justify-start'>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete banner
          </Button>

        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <EditData row={row.original} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}