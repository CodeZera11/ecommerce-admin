"use client";

import { Plus } from "lucide-react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { CategoriesColumns, columns } from "@/app/(dashboard)/[storeId]/(routes)/categories/columns";

interface CategoriesClientProps {
    data: CategoriesColumns[];
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage your categories from here"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/categories/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchType="name" columns={columns} data={data} />
        </>
    )
}

export default CategoriesClient