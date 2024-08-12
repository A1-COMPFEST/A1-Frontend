"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FaStar } from "react-icons/fa";

interface FilterAccordionProps {
  categories: {
    name: string;
    id: number;
  }[];
}

const ratings = [3, 4, 5];
const difficulties = ["beginner", "intermediate", "professional"];

export default function FilterAccordion({ categories }: FilterAccordionProps) {
  console.log(categories);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const addToUrl = (arr: any, param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, arr.toString());
    router.push(`?${params.toString()}`);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prevSelectedRatings) => {
      console.log(selectedRatings);
      if (prevSelectedRatings.includes(rating)) {
        const newRatings = prevSelectedRatings.filter((r) => r !== rating);
        addToUrl(newRatings, "min_rating");
        return newRatings;
      } else {
        const newRatings = [...prevSelectedRatings, rating];
        addToUrl(newRatings, "min_rating");
        return newRatings;
      }
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty((prevSelectedDifficulty) => {
      if (prevSelectedDifficulty.includes(difficulty)) {
        const newDiff = prevSelectedDifficulty.filter((d) => d !== difficulty);
        addToUrl(newDiff, "difficulty");
        return newDiff;
      } else {
        const newDiff = [...prevSelectedDifficulty, difficulty];
        addToUrl(newDiff, "difficulty");
        return newDiff;
      }
    });
  };

  const handleCategoryChange = (category: number) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        const newCategories = prevSelectedCategories.filter(
          (c) => c !== category
        );
        addToUrl(newCategories, "category_id");
        return newCategories;
      } else {
        const newCategories = [...prevSelectedCategories, category];
        addToUrl(newCategories, "category_id");
        return newCategories;
      }
    });
  };

  return (
    <div>
      <h2 className="pt-8 font-bold">Filter by</h2>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="min_rating">
          <AccordionTrigger>Minimum Rating</AccordionTrigger>
          <AccordionContent>
            {ratings.map((rating) => (
              <div className="flex items-center space-x-2 mb-2" key={rating}>
                <Checkbox
                  id={`min_rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <Label
                  htmlFor={`min_rating-${rating}`}
                  className="flex items-center"
                >
                  {Array.from({ length: rating }, (_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                  ))}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="difficulty">
          <AccordionTrigger>Difficulty</AccordionTrigger>
          <AccordionContent>
            {difficulties.map((difficulty) => (
              <div
                className="flex items-center space-x-2 mb-2"
                key={difficulty}
              >
                <Checkbox
                  id={`difficulty-${difficulty}`}
                  checked={selectedDifficulty.includes(difficulty)}
                  onCheckedChange={() => handleDifficultyChange(difficulty)}
                />
                <Label
                  htmlFor={`difficulty-${difficulty}`}
                  className="capitalize"
                >
                  {difficulty}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            {categories.map((category) => (
              <div
                className="flex items-center space-x-2 mb-2"
                key={category.id}
              >
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <Label htmlFor={`category-${category}`} className="capitalize">
                  {category.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
