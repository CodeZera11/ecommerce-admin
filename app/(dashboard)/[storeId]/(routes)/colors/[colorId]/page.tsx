import ColorForm from "@/components/color-form";
import prisma from "@/lib/prisma"

const ColorPage = async (
    { params }:
        { params: { colorId: string } }
) => {

    let color;

    if (params.colorId === 'new') {
        color = null
    } else {
        color = await prisma.color.findUnique({
            where: {
                id: params.colorId
            }
        })
    }


    return (
        <>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <ColorForm initialData={color} />
                </div>
            </div>
        </>
    )
}

export default ColorPage