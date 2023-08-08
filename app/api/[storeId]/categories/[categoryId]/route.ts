import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; categoryId: string };
  }
) {
  try {
    if (!params.storeId) {
      return NextResponse.json("Store ID is Required", { status: 400 });
    }

    if (!params.categoryId) {
      return NextResponse.json("Category ID is Required", { status: 400 });
    }

    const category = await prisma.category.findFirst({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; categoryId: string };
  }
) {
  try {
    const { userId } = auth();

    const { name, billboardId } = await req.json();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return NextResponse.json("Name is Required", { status: 400 });
    }

    if (!billboardId) {
      return NextResponse.json("Billboard ID is Required", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store ID is Required", { status: 400 });
    }

    if (!params.categoryId) {
      return NextResponse.json("Category ID is Required", { status: 400 });
    }

    const billboardByBillboardId = await prisma.category.findFirst({
      where: {
        billboardId,
      },
    });

    if (!billboardByBillboardId) {
      return NextResponse.json("No billboard found", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; categoryId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store ID is Required", { status: 400 });
    }

    if (!params.categoryId) {
      return NextResponse.json("Category ID is Required", { status: 400 });
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

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
