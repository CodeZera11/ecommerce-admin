import ProductForm from "@/components/product-form";
import prisma from "@/lib/prisma"

const ProductPage = async (
    { params }:
        { params: { productId: string, storeId: string } }
) => {


    let product;

    if (params.productId === 'new') {
        product = null
    } else {
        product = await prisma.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true
            }
        })
    }

    let categories = await prisma.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    let sizes = await prisma.size.findMany({
        where: {
            storeId: params.storeId
        }
    })

    let colors = await prisma.color.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ProductForm categories={categories} sizes={sizes} colors={colors} initialData={product} />
                </div>
            </div>
        </>
    )
}

export default ProductPage