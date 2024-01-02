import { Button } from "@/components/ui/button";

import { Cell } from "../types";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export const LinkPreview: Cell = (props) => {
  const href = props.row.getValue("link") as string;

  return <Button variant="link" className="px-0" asChild>
    <Link
      target="_blank"
      className="flex items-center"
      href={href}
    >
      preview
      <ExternalLinkIcon />
    </Link>
  </Button>
};
