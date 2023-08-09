import SizesClient from '@/components/sizes-client'
import prisma from '@/lib/prisma'
import { format } from "date-fns"
import ApiList from '@/components/ApiList'
import { SizeColumns } from './columns'

const SizesPage = async (
    { params }: {
        params: { storeId: string }
    }
) => {


    const sizes = await prisma.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizeColumns[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <SizesClient data={formattedSizes} />
                <ApiList name={"sizes"} idName={"sizeId"} />
            </div>
        </div>
    )
}

export default SizesPage