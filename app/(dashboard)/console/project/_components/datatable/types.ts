import { Banner } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Primitive } from "react-hook-form";

export type Cell = ColumnDef<Banner>["cell"]


type ExtractFunction<T extends ((...args: any) => any) | Primitive> = T extends (...args: infer P) => any ? P : never;

export type CellFn = ExtractFunction<Cell>[0]

export type CellWithHtmlProps = CellFn & React.HTMLAttributes<HTMLInputElement>