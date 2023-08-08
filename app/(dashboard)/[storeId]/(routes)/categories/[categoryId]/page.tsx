import CategoryForm from "@/components/category-form";
import prisma from "@/lib/prisma";

const CategoryPage = async (
    { params }: {
        params: { categoryId: string, storeId: string }
    }
) => {

    let category;

    if (params.categoryId === "new") {
        category = null
    } else {
        category = await prisma.category.findFirst({
            where: {
                id: params.categoryId
            }
        })
    }

    const billboards = await prisma.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm
                    initialData={category}
                    billboards={billboards}
                />
            </div>
        </div>
    )
}

export default CategoryPage