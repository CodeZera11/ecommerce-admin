import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
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

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("CATEGORY_POST", error);
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
      return NextResponse.json("Store ID is Required", { status: 400 });
    }

    const categories = await prisma.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log("CATEGORY_POST", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
