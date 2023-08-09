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

    const { name, value } = body;

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

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 405 });
    }

    const color = await prisma.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.log("[COLORS_POST]", error);
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

    const colors = await prisma.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors, { status: 200 });
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
