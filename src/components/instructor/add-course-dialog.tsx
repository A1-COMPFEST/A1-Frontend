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
import { addCourse } from "@/app/actions/actions";
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

interface AddCourseDialog {
  userId: number;
  categories: Category[];
}

export default function AddCourseDialog({
  userId,
  categories,
}: AddCourseDialog) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    formData.append("instructor_id", userId.toString());
    formData.append("category_id", "1");

    try {
      const response = await addCourse(formData);

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
              <Label htmlFor="name" className="text-left">
                Course Name
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Golang for Beginner"
                  className="flex-grow"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="category_id" className="text-left">
                Course Category
              </Label>
              <div className="flex items-center gap-2">
                <Select name="category_id">
                  <SelectTrigger id="category_id">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {categories.map((category: Category) => (
                      <SelectItem value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="difficulty" className="text-left">
                Difficulty Level
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex flex-row items-center justify-center gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="level" value="beginner" />
                    Beginner
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="level" value="intermediate" />
                    Intermediate
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="level" value="professional" />
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
                <Textarea
                  id="description"
                  name="description"
                  placeholder="A detailed overview of the course content"
                  className="flex-grow p-2 border bg-gray-100 rounded-md text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="image" className="text-left">
                Add Course Cover
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  name="image"
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
