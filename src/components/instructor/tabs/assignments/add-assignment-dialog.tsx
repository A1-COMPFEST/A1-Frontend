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
import toast from "react-hot-toast";
import { addAssignment} from "@/app/actions/instructor/assignment-action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";


interface AddAssignmentDialogProps {
    courseId: string
}

export default function AddAssignmentDialog({
    courseId,
    }: AddAssignmentDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            const response = await addAssignment(formData, courseId);
            console.log(response);
            toast.success("Assignment added successfully!");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("An error occurred while adding the assignment");
            console.error("Error adding new assignment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add Assignment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Add New Assignment
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
                            <Label htmlFor="due_date">Due Date (days after course enrollment)</Label>
                            <Input id="due_date" name="due_date" type="number" placeholder="e.g. 10 for 10 days after course enrolled" required />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="task">Task File (PDF or MP4, max 10MB)</Label>
                            <Input id="task" name="task" type="file" accept=".pdf,.mp4" required />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Assignment"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
