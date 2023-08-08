import CategoriesClient from '@/components/categories-client';
import React from 'react';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import { CategoriesColumns } from './columns';
import ApiList from '@/components/ApiList';

const CategoriesPage = async (
    { params }: {
        params: { storeId: string }
    }
) => {

    const categories = await prisma.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoriesColumns[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <CategoriesClient data={formattedCategories} />
                <ApiList name={"categories"} idName={"categoryId"} />
            </div>
        </div>
    )
}

export default CategoriesPage