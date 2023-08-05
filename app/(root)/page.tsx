"use client"

import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect, useState } from 'react'

export default function SetupPage() {

    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    const [isMounted, setIsMounted] = useState(false)


    useEffect(() => {
        setIsMounted(true)
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <div>Root Page</div>
        </>
    )
}