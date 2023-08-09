"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellActions from "@/components/cell-actions-billboard";

export type OrderColumns = {
    id: string;
    phone: string;
    address: string;
    isPaid: boolean;
    totalPrice: string;
    products: string
    createdAt: string;
}

export const columns: ColumnDef<OrderColumns>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
    },
    {
        accessorKey: "totalPrice",
        header: "Total",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    }
]
