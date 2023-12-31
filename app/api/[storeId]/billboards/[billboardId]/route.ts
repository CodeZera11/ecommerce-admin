import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return NextResponse.json("Billboard Id is required", { status: 400 });
    }

    const billboard = await prisma?.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("BILLBOARD_GET", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    const { images, label } = await req.json();

    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 401 });
    }

    if (!label) {
      return NextResponse.json("Label is required!", { status: 400 });
    }

    if (!images || !images.length) {
      return NextResponse.json("Images are Required!", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is required", { status: 400 });
    }

    if (!params.billboardId) {
      return NextResponse.json("Billboard Id is required", { status: 400 });
    }

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    await prisma?.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        images: {
          deleteMany: {},
        },
      },
    });

    const billboard = await prisma?.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("BILLBOARD_PATCH", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is required", { status: 400 });
    }

    if (!params.billboardId) {
      return NextResponse.json("Billboard Id is required", { status: 400 });
    }

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    const billboard = await prisma?.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("BILLBOARD_DELETE", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
