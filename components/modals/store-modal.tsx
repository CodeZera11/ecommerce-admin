"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"

import * as z from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "String must contain atleast 1 character!"
    }),
})



export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Modal title="Create Store" description="Add new store to manage products and categories" isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-Commerce" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full justify-end items-center gap-2">
                        <Button variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                        <Button type="submit">Continue</Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}