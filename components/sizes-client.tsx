"use client";

import Heading from "./Heading";
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { SizeColumns, columns } from "@/app/(dashboard)/[storeId]/(routes)/sizes/columns";

interface SizesClientProps {
    data: SizeColumns[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${data.length})`} description='Manage your sizes from here' />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchType={"name"} columns={columns} data={data} />
        </>
    )
}

export default SizesClient