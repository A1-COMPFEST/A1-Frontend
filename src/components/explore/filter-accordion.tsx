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

const ratings = [3, 4, 5];
const difficulties = ["beginner", "intermediate", "professional"];
const categories = ["programming", "math"];

export default function FilterAccordion() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    min_rating: [] as number[],
    difficulty: [] as string[],
    category: [] as string[],
  });

  useEffect(() => {
    const minRatingParam = searchParams.get("min_rating");
    const difficultyParam = searchParams.get("difficulty");
    const categoryParam = searchParams.get("category");

    setFilters({
      min_rating: minRatingParam ? minRatingParam.split(",").map(Number) : [],
      difficulty: difficultyParam ? difficultyParam.split(",") : [],
      category: categoryParam ? categoryParam.split(",") : [],
    });
  }, [searchParams]);

  const updateFilters = (
    filterType: keyof typeof filters,
    value: string | number,
    checked: boolean
  ) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        // @ts-ignore
        updatedFilters[filterType] = [...prevFilters[filterType], value];
      } else {
        // @ts-ignore
        updatedFilters[filterType] = prevFilters[filterType].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length > 0) {
        params.set(key, value.join(","));
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  }, [filters, router]);

  const isChecked = (
    filterType: keyof typeof filters,
    value: string | number
  ) => {
    // @ts-ignore
    return filters[filterType].includes(value);
  };

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="min_rating">
        <AccordionTrigger>Minimum Rating</AccordionTrigger>
        <AccordionContent>
          {ratings.map((rating) => (
            <div className="flex items-center space-x-2 mb-2" key={rating}>
              <Checkbox
                id={`min_rating-${rating}`}
                checked={isChecked("min_rating", rating)}
                onCheckedChange={(checked) =>
                  updateFilters("min_rating", rating, checked as boolean)
                }
              />
              <Label
                htmlFor={`min_rating-${rating}`}
                className="flex items-center"
              >
                {Array.from({ length: rating }, (_, index) => (
                  <FaStar key={index} className="text-yellow-500"/>
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
            <div className="flex items-center space-x-2 mb-2" key={difficulty}>
              <Checkbox
                id={`difficulty-${difficulty}`}
                checked={isChecked("difficulty", difficulty)}
                onCheckedChange={(checked) =>
                  updateFilters("difficulty", difficulty, checked as boolean)
                }
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
            <div className="flex items-center space-x-2 mb-2" key={category}>
              <Checkbox
                id={`category-${category}`}
                checked={isChecked("category", category)}
                onCheckedChange={(checked) =>
                  updateFilters("category", category, checked as boolean)
                }
              />
              <Label htmlFor={`category-${category}`} className="capitalize">
                {category}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
