import { Cell } from "../types";
import Image from "next/image";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export const ImageCell: Cell = ({ row }) => (
  
    <Dialog>
      <DialogTrigger asChild>
        <Image
          className="aspect-square object-cover rounded-md cursor-pointer"
          src={row.getValue("imageUrl")}
          alt={row.getValue("description")}
          width={50}
          height={50}
        />
      </DialogTrigger>
      <DialogContent className="max-w-6xl bg-auto border-none h-[90vh]">
        <Image
          className=" object-cover rounded-md"
          src={row.getValue("imageUrl")}
          alt={row.getValue("description")}
          fill
        />
      </DialogContent>
    </Dialog>

  
);