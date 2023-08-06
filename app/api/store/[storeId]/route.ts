import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (!name) {
      return NextResponse.json("Name is Required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is Required", { status: 400 });
    }

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[STOREID_PATCH]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthorized!", { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is required!", { status: 400 });
    }

    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[STOREID_DELETE]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
