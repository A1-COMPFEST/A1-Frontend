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
import { editAssignment } from "@/app/actions/instructor/assignment-action";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

interface EditAssignmentDialogProps {
    assignmentId: string;
    courseId: string;
    assignmentTitle: string;
    assignmentDescription: string;
    assignmentDueDate: string;
}

export default function EditAssignmentDialog({
                                                 assignmentId,
                                                 courseId,
                                                 assignmentTitle,
                                                 assignmentDescription,
                                                 assignmentDueDate,
                                             }: EditAssignmentDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(assignmentTitle);
    const [description, setDescription] = useState(assignmentDescription);
    const [dueDate, setDueDate] = useState(assignmentDueDate);

    useEffect(() => {
        setTitle(assignmentTitle);
        setDescription(assignmentDescription);
        setDueDate(assignmentDueDate);
    }, [assignmentTitle, assignmentDescription, assignmentDueDate]);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            await editAssignment(formData, courseId, assignmentId);
            toast.success("Assignment updated successfully!");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("An error occurred while updating the assignment");
            console.error("Error updating assignment:", error);
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
                        Edit {assignmentTitle}
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
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="due_date">Due Date</Label>
                            <Input
                                id="due_date"
                                name="due_date"
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="task">Task File (PDF or MP4, max 10MB)</Label>
                            <Input id="task" name="task" type="file" accept=".pdf,.mp4" />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Assignment"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}