import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return NextResponse.json("Product Id is required", { status: 400 });
    }

    const product = await prisma?.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("PRODUCT_GET", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isArchived,
      isFeatured,
    } = await req.json();

    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 401 });
    }

    if (!name) {
      return NextResponse.json("Name is required!", { status: 400 });
    }

    if (!price) {
      return NextResponse.json("Price is Required!", { status: 400 });
    }

    if (!images || !images.length) {
      return NextResponse.json("Images are Required!", { status: 400 });
    }

    if (!categoryId) {
      return NextResponse.json("Category ID is Required!", { status: 400 });
    }

    if (!colorId) {
      return NextResponse.json("Color ID is Required!", { status: 400 });
    }

    if (!sizeId) {
      return NextResponse.json("Size ID is Required!", { status: 400 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store ID is required", { status: 400 });
    }

    if (!params.productId) {
      return NextResponse.json("Product ID is required", { status: 400 });
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

    await prisma?.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prisma?.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("BILLBOARD_PATCH", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthenticated!", { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json("Store Id is required", { status: 400 });
    }

    if (!params.productId) {
      return NextResponse.json("Product Id is required", { status: 400 });
    }

    const storeByUserId = await prisma?.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json("Unauthorized", { status: 405 });
    }

    const product = await prisma?.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("PRODUCT_DELETE", error);
    return NextResponse.json("Internal Server Error!", { status: 500 });
  }
}
