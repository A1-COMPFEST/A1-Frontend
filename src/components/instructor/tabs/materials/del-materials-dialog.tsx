"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { deleteMaterial } from "@/app/actions/instructor/material-action";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteMaterialDialogProps {
    courseId: string;
    materialId: string;
}

export default function DeleteMaterialDialog({
    courseId,
    materialId,
    }: DeleteMaterialDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteMaterial(courseId, materialId);
            toast.success("Material deleted successfully!");
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            toast.error("An error occurred");
            console.error("Error during deleting material:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Delete Material
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>Are you sure you want to delete this material? This action cannot be undone.</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}