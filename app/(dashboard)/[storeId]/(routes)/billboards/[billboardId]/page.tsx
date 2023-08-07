import BillboardForm from "@/components/BillboardForm";
import prisma from "@/lib/prisma"

const BillboardPage = async (
    { params }:
        { params: { billboardId: string } }
) => {

    let billboard;

    if (params.billboardId === 'new') {
        billboard = null
    } else {
        billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })
    }




    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <BillboardForm initialData={billboard} />
                </div>
            </div>
        </>
    )
}

export default BillboardPage