import BillboardsClient from '@/components/billboards-client'
import prisma from '@/lib/prisma'
import { BillboardColumns } from './columns'
import { format } from "date-fns"
import ApiList from '@/components/ApiList'

const BillboardsPage = async (
    { params }: {
        params: { storeId: string }
    }
) => {

    const billboards = await prisma.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            images: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBillboards: BillboardColumns[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <BillboardsClient data={formattedBillboards} />
                <ApiList name={"billboards"} idName={"billboardId"} />
            </div>
        </div>
    )
}

export default BillboardsPage