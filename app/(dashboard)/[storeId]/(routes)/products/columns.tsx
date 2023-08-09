"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellActions from "@/components/cell-actions-products";

export type ProductColumns = {
    id: string;
    name: string;
    price: string;
    category: string;
    size: string;
    color: string;
    isFeatured: boolean;
    isArchieved: boolean;
    createdAt: string;
}

export const columns: ColumnDef<ProductColumns>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
            </div>
        )
    },
    {
        accessorKey: "isFeatured",
        header: "Featured",
    },
    {
        accessorKey: "isArchieved",
        header: "Archieved",
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
