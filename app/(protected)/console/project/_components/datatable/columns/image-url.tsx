import { Button } from "@/components/ui/button";
import { EditIcon, ExternalLinkIcon } from "lucide-react";
import { Cell } from "../types";
import Link from "next/link";
import { EditableCell } from "../../editable-cell";
import { useState } from "react";

export const ImageUrl: Cell = (props) => {
  const href = props.row.getValue("imageUrl") as string;
  const [shouldEdit, setShouldEdit] = useState(false);
  if (href && !shouldEdit) {
    return (
      <div className="flex items-center ">
        <Button variant="link" className="px-0" asChild>
          <Link
            target="_blank"
            className="flex items-center gap-x-2"
            href={href}
          >
            priview
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          
          onClick={() => setShouldEdit(true)}
        >
          <EditIcon className="h-4 w-4 text-blue-500" />
        </Button>
      </div>
    );
  }
  return <EditableCell handleBlur={() => setShouldEdit(false)} {...props} className="text-sm text-muted-foreground" />;
};
