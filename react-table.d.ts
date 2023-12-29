import { Banner } from "@prisma/client";
import { type RowData } from "@tanstack/react-table";
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    deleteData: (rowIndex: number) => void;
  }
}
