"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellActions from "@/components/cell-actions-billboard";

export type BillboardColumns = {
    id: string;
    label: string;
    createdAt: string;
}

export const columns: ColumnDef<BillboardColumns>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellActions data={row.original} />
    }
]
