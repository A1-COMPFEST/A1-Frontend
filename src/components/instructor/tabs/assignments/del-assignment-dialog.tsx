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
import {addAssignment, deleteAssignment, editAssignment} from "@/app/actions/instructor/assignment-action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";


interface EditAssignmentDialogProps {
    assignmentId: string;
    courseId: string
    assignmentTitle: string;
}

export default function DelAssignmentDialog({
    assignmentId,
    assignmentTitle,
    }: EditAssignmentDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteAssignment(assignmentId);
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
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Delete Assignment
                    </DialogTitle>
                </DialogHeader>
                <form
                    action={async () => {
                        await handleDelete();
                        setIsOpen(false);
                    }}
                >
                    <div className={`text-center`}>
                        Are you sure wanna delete {``}
                        <span className={`text-[#094C62]`}>
                            {assignmentTitle}
                        </span>?
                    </div>
                    <div className="grid gap-4 py-8">
                        <Button type="submit" disabled={loading}>
                            Delete
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
