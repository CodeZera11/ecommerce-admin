"use client"

import { BillboardColumns } from '../app/(dashboard)/[storeId]/(routes)/billboards/columns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import ApiAlert from './api-alert'
import { AlertModal } from './modals/alert-modal'
import { useParams, useRouter } from 'next/navigation'
import { SizeColumns } from '@/app/(dashboard)/[storeId]/(routes)/sizes/columns'

interface CellActionsProps {
    data: SizeColumns
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const onCopy = () => {
        try {
            navigator.clipboard.writeText(data.id)
            toast.success("Color ID Copied to Clipboard!")
        } catch (error) {
            toast.error("Something Went Wrong!");
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
            router.refresh();
            toast.success("Color deleted successfully.")
        } catch (error) {
            toast.error("Something went Wrong!")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const onEdit = () => {
        try {
            setLoading(true);
            router.push(`/${params.storeId}/colors/${data.id}`)
        } catch (error) {
            toast.error("Something went Wrong!")
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onCopy}>
                        <Copy className='h-4 w-4 mr-4' />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit}>
                        <Edit className='h-4 w-4 mr-4' />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className='h-4 w-4 mr-4' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellActions