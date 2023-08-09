
import prisma from '@/lib/prisma'
import { ProductColumns } from './columns'
import { format } from "date-fns"
import ApiList from '@/components/ApiList'
import ProductsClient from '@/components/product-client'
import { formatter } from '@/lib/utils'

const ProductsPage = async (
    { params }: {
        params: { storeId: string }
    }
) => {


    const products = await prisma.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true,

        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductColumns[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: formatter.format(item.price).toString(),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        isFeatured: item.isFeatured,
        isArchieved: item.isArchived,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <ProductsClient data={formattedProducts} />
                <ApiList name={"products"} idName={"productId"} />
            </div>
        </div>
    )
}

export default ProductsPage