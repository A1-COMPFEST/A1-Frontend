"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {addCourse, deleteCourse, updateCourse} from "@/app/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { Category } from "@/app/types";

interface DeleteCourseDialog {
    userId: string;
    courseId: number;
    courseName: string;
}

export default function DeleteCourseDialog({
    userId,
    courseId,
    courseName,
    }: DeleteCourseDialog) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async () => {

        try {
            const response = await deleteCourse(courseId);
            console.log(response);
            toast.success("Course edited successfully!");
            router.refresh();
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred");
            console.error("Error during editing the course:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className={`bg-[#FFEDE7] text-[#DF4B4B] hover:bg-[#FFE0D7]`}>Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Delete Course
                    </DialogTitle>
                </DialogHeader>
                <form
                    action={async () => {
                        await handleSubmit();
                        setIsOpen(false);
                    }}
                >
                    <div className={`text-center`}>
                        Are you sure wanna delete {``}
                        <span className={`text-[#094C62]`}>
                            {courseName}
                        </span>?
                    </div>
                    <div className="grid gap-4 py-8">
                        <Button type="submit" disabled={loading}>
                            Commit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
