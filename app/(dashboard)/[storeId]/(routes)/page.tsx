import prisma from "@/lib/prisma"

interface DashboardPageProps {
    params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId
        }
    })

    return (
        <div>
            this is dashboardPage {store?.name}
        </div>
    )
}

export default DashboardPage