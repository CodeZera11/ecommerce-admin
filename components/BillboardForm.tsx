"use client";

import { Billboard, Image } from "@prisma/client";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AlertModal } from "./modals/alert-modal";
import ImageUpload from "./image-upload";

interface BillboardFormProps {
    initialData?: Billboard & {
        image?: Image[]
    } | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
})


const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {

    const title = initialData ? "Edit billboard" : "Create Billboard"
    const description = initialData ? "Edit a billboard" : "Add a new billboard"
    const toastMessage = initialData ? "Billboard updated." : "Billboard created."
    const action = initialData ? "Save Changes" : "Create"

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();

    const defaultValues = initialData ? {
        ...initialData,
    } : {
        label: '',
        images: [],
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, values)
            }
            router.refresh();
            toast.success(toastMessage)
            router.push(`/${params.storeId}/billboards`)
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.push(`/${params.storeId}/billboards`)
            toast.success("Billboard deleted.")
        } catch (error) {
            toast.error("Make sure to removed all categories using this billboard.")
        } finally {
            setLoading(false)
            setOpen(false)
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
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button disabled={loading} variant={"destructive"} size={"sm"} onClick={() => setOpen(true)}>
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Images</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value.map((image) => image.url)}
                                            disabled={loading}
                                            onChange={(url) => field.onChange([...field.value, { url }])}
                                            onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Label</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Enter billboard label" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={loading} type="submit">{action}</Button>
                    </form>
                </Form>
            </div>
            <Separator />
        </>
    )
}

export default BillboardForm