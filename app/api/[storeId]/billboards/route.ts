import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, images } = body;

    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 401 });
    }

    if (!label) {
      return NextResponse.json("Label is required!", { status: 400 });
    }

    if (!images || images.length === 0) {
      return NextResponse.json("Images are Required!", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 405 });
    }

    const billboard = await prisma.billboard.create({
      data: {
        label,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json("Store Id is required", { status: 400 });
    }

    const billboards = await prisma.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(billboards, { status: 200 });
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
