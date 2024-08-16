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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateGrade } from "@/app/actions/instructor/submission-action";

interface AddGradeDialogProps {
    assignmentId: string;
    answerId: string;
    currentGrade: number | null;
}

export default function AddGradeDialog({ assignmentId, answerId, currentGrade }: AddGradeDialogProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            const response = await updateGrade(formData, assignmentId, answerId);
            console.log(response);
            toast.success("Grade updated successfully");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update grade");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add Grade</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Review
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSubmit(formData);
                }}>
                    <div className="grid gap-4 py-4">
                        <div className="text-center">
                            <p>Current Grade: {currentGrade !== null ? `${currentGrade}/100` : 'Not graded'}</p>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="grade">New Grade</Label>
                            <Input
                                id="grade"
                                name="grade"
                                type="number"
                                defaultValue={currentGrade?.toString() || ""}
                                required
                                min="0"
                                max="100"
                                step="0.1"
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Grade"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}