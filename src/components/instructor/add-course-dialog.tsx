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
import {addCourse} from "@/app/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface AddCourseDialog {
    userId: number;
}

export default function AddCourseDialog( { userId }:AddCourseDialog ) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {

        const courseName = formData.get("courseName") as string;
        const courseCategory = formData.get("courseCategory") as string;
        const level = formData.get("difficulty") as string;
        const brief = formData.get("brief") as string;
        const description = formData.get("description") as string;
        const cover = formData.get("cover") as File;
        const price = formData.get("price") as string;

        const ammountPrice = parseInt(price);

        try {
            const response = await addCourse(userId, courseName, courseCategory, level, brief, description, cover, ammountPrice);

            console.log(response);
            toast.success("Course added successfully!");
            router.refresh();
        } catch (error) {
            setLoading(false);
            toast.error("An error occurred");
            console.error("Error during adding new course:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add Course</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Add New Course
                    </DialogTitle>
                </DialogHeader>
                <form
                    action={async (formData) => {
                        await handleSubmit(formData);
                        setIsOpen(false);
                    }}
                >
                    <div className="grid gap-4 py-8">
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="courseName" className="text-left">
                                Course Name
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="courseName"
                                    name="courseName"
                                    type="text"
                                    placeholder="e.g. Golang for Beginner"
                                    className="flex-grow"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="courseCategory" className="text-left">
                                Course Category
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="courseCategory"
                                    name="courseCategory"
                                    type="text"
                                    placeholder="e.g. Programming Language"
                                    className="flex-grow"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="difficulty" className="text-left">
                                Difficulty Level
                            </Label>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-row items-center justify-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="difficulty" value="beginner" required/>
                                        Beginner
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="difficulty" value="intermediate"/>
                                        Intermediate
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="difficulty" value="professional"/>
                                        professional
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="brief" className="text-left">
                                Brief
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="brief"
                                    name="brief"
                                    type="text"
                                    placeholder="A concise summary of the course"
                                    className="flex-grow"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="description" className="text-left">
                                Description
                            </Label>
                            <div className="flex items-center gap-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="A detailed overview of the course content"
                                    className="flex-grow p-2 border bg-gray-100 rounded-md text-sm"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="cover" className="text-left">
                                Add Course Cover
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    accept="image/*"
                                    className="flex-grow text-gray-400"
                                />
                            </div>
                        </div>
                        <Label htmlFor="price" className="text-left">
                            Price
                        </Label>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="price" className="text-right">
                                Rp
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="100000"
                                className="flex-grow"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            Add new Course
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
