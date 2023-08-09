"use client";

import Heading from "./Heading";
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { ProductColumns, columns } from "@/app/(dashboard)/[storeId]/(routes)/products/columns";

interface ProductClientProps {
    data: ProductColumns[];
}

const ProductsClient: React.FC<ProductClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${data.length})`} description='Manage your products from here' />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchType={"name"} columns={columns} data={data} />
        </>
    )
}

export default ProductsClient