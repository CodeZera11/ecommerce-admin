"use client";

import Heading from "./Heading";
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { ColorColumns, columns } from "@/app/(dashboard)/[storeId]/(routes)/colors/columns";


interface ColorClientProps {
    data: ColorColumns[];
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Colors (${data.length})`} description='Manage your colors from here' />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchType={"name"} columns={columns} data={data} />
        </>
    )
}

export default ColorClient