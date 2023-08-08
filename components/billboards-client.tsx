"use client";

import Heading from "./Heading";
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { BillboardColumns, columns } from "@/app/(dashboard)/[storeId]/(routes)/billboards/columns";

interface BillboardsClientProps {
    data: BillboardColumns[];
}

const BillboardsClient: React.FC<BillboardsClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${data.length})`} description='Manage your billboards from here' />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchType={"label"} columns={columns} data={data} />
        </>
    )
}

export default BillboardsClient