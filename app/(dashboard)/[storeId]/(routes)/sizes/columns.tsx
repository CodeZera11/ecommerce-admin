"use client"

import CellActions from "@/components/cell-actions-size";
import { ColumnDef } from "@tanstack/react-table"

export type SizeColumns = {
    id: string;
    name: string;
    value: string;
    createdAt: string;
}

export const columns: ColumnDef<SizeColumns>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
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
