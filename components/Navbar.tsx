import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import StoreSwitcher from './store-switcher'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

const Navbar = async () => {

    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in")
    }

    const stores = await prisma.store.findMany({
        where: {
            userId
        },
    });

    return (
        <div className='w-full flex items-center h-16 border-b px-4 lg:px-6'>
            <StoreSwitcher items={stores} />
            <MainNav className="mx-6" />
            <div className='ml-auto'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar