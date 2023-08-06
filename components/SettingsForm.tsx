"use client";

import { Store } from "@prisma/client";
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
import ApiAlert from "./api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
})

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            await axios.patch(`/api/store/${params.storeId}`, values)
            toast.success("Name updated successfully")
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/store/${params.storeId}`)
            router.push("/")
            toast.success("Store deleted.")
        } catch (error) {
            toast.error("Make sure to remove all products and categories")
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
                <Heading title="Settings" description="Manage your store from here" />
                <Button disabled={loading} variant={"destructive"} size={"sm"} onClick={() => setOpen(true)}>
                    <Trash className="w-4 h-4" />
                </Button>
            </div>
            <Separator />
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Enter store name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={loading} type="submit">Save Changes</Button>
                    </form>
                </Form>
            </div>
            <Separator />
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/${params.storeId}`} variant="public" />
        </>
    )
}

export default SettingsForm