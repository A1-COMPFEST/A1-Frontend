"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { editMaterial } from "@/app/actions/instructor/material-action";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditMaterialDialogProps {
    courseId: string;
    materialId: string;
    initialData: {
        title: string;
        description: string;
    };
}

export default function EditMaterialDialog({
    courseId,
    materialId,
    initialData,
    }: EditMaterialDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            const response = await editMaterial(formData, courseId, materialId);
            console.log(response);
            toast.success("Material updated successfully!");
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            toast.error("An error occurred");
            console.error("Error during updating material:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Edit Material
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSubmit(formData);
                }}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" type="text" defaultValue={initialData.title} required />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={initialData.description} required />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="file">File (PDF or MP4, max 10MB)</Label>
                            <Input id="file" name="file" type="file" accept=".pdf,.mp4" />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Material"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}