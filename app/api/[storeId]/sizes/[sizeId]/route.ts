import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return NextResponse.json("Size Id is required", { status: 400 });
    }

    const size = await prisma?.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("SIZE_GET", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    const { name, value } = await req.json();

    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 401 });
    }

    if (!name) {
      return NextResponse.json("Name is required!", { status: 400 });
    }

    if (!value) {
      return NextResponse.json("Value is Required!", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is required", { status: 400 });
    }

    if (!params.sizeId) {
      return NextResponse.json("Size Id is required", { status: 400 });
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

    const size = await prisma?.size.updateMany({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("SIZE_PATCH", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is required", { status: 400 });
    }

    if (!params.sizeId) {
      return NextResponse.json("Size Id is required", { status: 400 });
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

    const size = await prisma?.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
