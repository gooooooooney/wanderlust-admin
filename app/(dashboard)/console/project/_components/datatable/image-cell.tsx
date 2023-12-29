import { Cell } from "./types";
import Image from "next/image";

export const ImageCell: Cell = ({ row }) => (
  <div className="">
    <Image
      className="aspect-square object-cover rounded-md"
      src={row.getValue("imageUrl")}
      alt={row.getValue("description")}
      width={50}
      height={50}
    />
  </div>
);