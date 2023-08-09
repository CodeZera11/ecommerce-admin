"use client";

import Heading from "./Heading";
import { Separator } from "./ui/separator";
import { DataTable } from "./data-table";
import { OrderColumns, columns } from "@/app/(dashboard)/[storeId]/(routes)/orders/columns";

interface OrdersClientProps {
    data: OrderColumns[];
}

const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {

    return (
        <>
            <Heading title={`Orders (${data.length})`} description='Manage your orders from here' />
            <Separator />
            <DataTable searchType={"label"} columns={columns} data={data} />
        </>
    )
}

export default OrdersClient