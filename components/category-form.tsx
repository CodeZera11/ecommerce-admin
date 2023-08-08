"use client"

import { Billboard, Category } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Heading from "./Heading";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { AlertModal } from "./modals/alert-modal";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

interface CategoryFormProps {
    initialData: Category | null,
    billboards: Billboard[]
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
})


const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {

    const title = initialData ? "Edit Category" : "Create Category";
    const description = initialData ? "Edit a category" : "Add a new category"
    const action = initialData ? "Save Changes" : "Create"
    const toastMessage = initialData ? "Category Updated." : "Category Created."

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/categories`, values)
            }
            router.push(`/${params.storeId}/categories`)
            router.refresh();
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.push(`/${params.storeId}/categories`);
            router.refresh();
            toast.success("Category Deleted.")
        } catch (error) {
            toast.error("Make sure you deleted all products using this billboard!")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                loading={loading}
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {
                    initialData && (
                        <Button variant={"destructive"} onClick={() => setOpen(true)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    )
                }
            </div>
            <Separator />
            <div className="">
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
                                            <Input placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="billboardId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Billboard</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value} >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {billboards.map((billboard) => (
                                                        <SelectItem value={billboard.id} key={billboard.id}>
                                                            {billboard.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={loading} type="submit">{action}</Button>
                    </form>
                </Form>
            </div >
        </>
    )
}

export default CategoryForm