"use client";

import { useStoreModal } from '@/hooks/use-store-modal';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Store } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { cn } from '@/lib/utils';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

const StoreSwitcher = ({
    className,
    items = []
}: StoreSwitcherProps) => {

    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    size={"sm"}
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className='h-4 w-4 mr-2' />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Store..." />
                    <CommandEmpty>No store found!</CommandEmpty>
                    <CommandGroup heading="Stores">
                        {formattedItems.map((store) => (
                            <CommandItem
                                key={store.value}
                                onSelect={() => onStoreSelect(store)}
                                className='flex justify-between'
                            >
                                <StoreIcon className='h-4 w-4 mr-2' />
                                {store.label}
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem onSelect={() => {
                                setOpen(false)
                                storeModal.onOpen()
                            }}>
                                <PlusCircle className='mr-2 h-5 w-5' />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default StoreSwitcher