import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const { name } = await req.json();

    if (!userId) {
      return NextResponse.json("Unauthorised", { status: 401 });
    }

    if (!name) {
      return NextResponse.json("Name is required!", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("[STORE_POST]", error);
  }
}
