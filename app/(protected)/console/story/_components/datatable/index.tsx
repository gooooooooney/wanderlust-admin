"use client"
import { Button } from "@/components/ui/button";
import { VirtualTour } from "@prisma/client";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronDownIcon, Copy } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { columns } from "./columns/columns";
import { toast } from "sonner";
import { DelDialog } from "./del-dialog";
import { deleteVirtualTour, updateVirtualTour } from "@/actions/virtual-tour";



function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

export const DataTableVt = ({ vts }: { vts: VirtualTour[] }) => {

  const [data, setData] = React.useState<VirtualTour[]>(vts);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  useEffect(() => {
    setData(vts)
  }, [vts])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable({
    data,
    columns: columns as any,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex,
    meta: {
      updateData: function updateData(rowIndex, columnId, value) {
        const oldRow = data[rowIndex] as VirtualTour
        const key = columnId as keyof VirtualTour
        // Skip if value is the same
        if (oldRow[key] === value) return
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        updateVirtualTour(oldRow.id, {
          [key]: value,
        })
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
      deleteData: function deleteDate(rowIndex) {
        const oldRow = data[rowIndex] as VirtualTour
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        toast.promise(deleteVirtualTour([oldRow.id]), {
          loading: "Deleting...",
          success: () => {
            setData(old => old.filter((_, index) => index !== rowIndex))
            return "Deleted"
          },
          error: "Failed"
        })
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DelDialog disabled={table.getSelectedRowModel().rows.length === 0} onConfirm={() => {
          const rows = table.getSelectedRowModel().rows
          const originalRows = rows.map(v => v.original) as VirtualTour[]
          // delete banners from db
          toast.promise(deleteVirtualTour(originalRows.map(v => v.id)), {
            loading: "Deleting banner...",
            success: () => {
             
              const indexList = rows.map(v => v.index)
              // update rows
              setData(old => old.filter((_, index) => !indexList.includes(index)))
              // update selected rows
              table.toggleAllPageRowsSelected(false)
              return "Banner deleted"
            },
            error: "Failed to delete banner"
          })
        }} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
Copy;

`
### 1. 研究目的与意义

#### 研究目的

本研究旨在深入分析人工智能技术在新闻传播领域中的应用现状、挑战与前景，探讨其对新闻行业的影响，以及如何更有效地利用人工智能技术提升新闻的采集、编辑、发布、推荐和反馈等各个环节的效率和质量。此外，本研究还旨在评估人工智能在新闻传播中的伦理问题和可能对社会造成的影响。

#### 研究意义

随着人工智能技术的快速发展和广泛应用，新闻行业正经历着前所未有的变革。人工智能不仅改变了新闻的生产方式，还重新定义了用户的阅读习惯和传播路径。因此，本研究的意义在于：

- 为新闻行业提供人工智能应用的深入洞察，帮助媒体机构优化资源配置，提升新闻质量和传播效率。
- 为新闻传播教育者提供教学内容更新的参考，培养符合时代需求的新闻传播人才。
- 为政策制定者提供决策支持，确保人工智能在新闻传播中的应用能够在遵守法律法规和伦理准则的基础上健康发展。
- 增进公众对人工智能在新闻传播中作用的理解，提升媒体透明度和公信力。

### 2. 研究问题

1. 人工智能在新闻采集、编辑和发布各个环节中具体是如何应用的，它们分别带来了哪些改变？
2. 人工智能如何影响新闻的内容质量、个性化推荐以及用户的信息获取行为？
3. 在人工智能辅助新闻传播的过程中，会遇到哪些伦理和法律问题，如何有效地解决这些问题？

### 3. 论文大纲

#### 引言
- 研究背景
- 研究的必要性
- 论文结构安排

#### 第一章 绪论
- 1.1 人工智能技术概述
- 1.2 新闻传播的发展历程
- 1.3 人工智能与新闻传播的交汇点

#### 第二章 人工智能在新闻采集中的应用
- 2.1 自动化新闻采集系统
  - 2.1.1 技术原理与工作流程
  - 2.1.2 应用案例分析
- 2.2 人工智能对新闻采集的影响
  - 2.2.1 提升效率与覆盖广度
  - 2.2.2 准确性和时效性分析

#### 第三章 人工智能在新闻编辑与发布中的应用
- 3.1 新闻自动生成技术
  - 3.1.1 技术原理与应用
  - 3.1.2 内容的质量控制
- 3.2 个性化新闻推荐系统
  - 3.2.1 推荐算法与用户画像
  - 3.2.2 用户体验与互动性提升
- 3.3 新闻内容的审核与伦理
  - 3.3.1 审核机制的建立与挑战
  - 3.3.2 伦理问题与解决策略

#### 第四章 人工智能在新闻传播中的社会影响
- 4.1 信息泡沫与过滤泡效应
  - 4.1.1 现象描述与成因分析
  - 4.1.2 对社会多元信息交流的影响
- 4.2 假新闻与信息失真问题
  - 4.2.1 人工智能与假新闻的识别
  - 4.2.2 法律法规与自律机制的构建

#### 第五章 人工智能在新闻传播中的伦理与法律问题
- 5.1 伦理问题概述
  - 5.1.1 隐私保护与数据安全
  - 5.1.2 机器偏见与责任归属
- 5.2 法律挑战与政策建议
  - 5.2.1 国内外法律法规现状
  - 5.2.2 政策建议与法律完善

#### 第六章 结论与展望
- 6.1 研究总结
- 6.2 人工智能在新闻传播中的未来趋势
- 6.3 研究的局限性与未来研究方向

#### 参考文献

#### 附录
- 调查问卷
- 访谈纪要
- 数据分析代码与结果

通过以上结构，本论文将全面分析人工智能在新闻传播中的应用，并对其带来的变革进行深入探讨。
`