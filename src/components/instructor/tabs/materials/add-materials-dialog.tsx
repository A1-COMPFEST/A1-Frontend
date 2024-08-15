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
import { addMaterial } from "@/app/actions/instructor/material-action";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddMaterialDialogProps {
    courseId: string
}

export default function AddMaterialDialog({
    courseId,
    }: AddMaterialDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            const response = await addMaterial(formData, courseId);
            console.log(response);
            toast.success("Material added successfully!");
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            toast.error("An error occurred");
            console.error("Error during adding new material:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add Material</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Add New Material
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
                            <Input id="title" name="title" type="text" required />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" required />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="file">File (PDF or MP4, max 10MB)</Label>
                            <Input id="file" name="file" type="file" accept=".pdf,.mp4" required />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Material"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}