"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import axios from "axios"

import * as z from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "String must contain atleast 1 character!"
    }),
})



export const StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            const response = await axios.post("/api/store", values)
            console.log(response.data)

            if (response.data.id) {
                window.location.assign(`/${response.data.id}`)
            }
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
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
                                        <Input disabled={loading} placeholder="E-Commerce" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full justify-end items-center gap-2">
                            <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                            <Button disabled={loading} type="submit">Continue</Button>

                        </div>
                    </form>
                </Form>
            </Modal>
        </>
    )
}