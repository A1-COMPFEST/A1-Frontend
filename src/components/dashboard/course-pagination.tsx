"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CourseCard from "../course-card";

const ITEMS_PER_PAGE = 8;

const courses = [
  {
    id: 1,
    name: "Python for Data Science, AI & Development",
    instructor_name: "AI sweigart",
    price: 500000,
    image: "/course-python.png",
  },
  {
    id: 2,
    name: "Go: The Complete Developer's Guide (Golang)",
    instructor_name: "AI sweigart",
    price: 600000,
    image: "/course-python.png",
  },
  {
    id: 3,
    name: "Complete Agile Scrum Master Certification Training",
    instructor_name: "AI sweigart",
    price: 700000,
    image: "/course-python.png",
  },
  {
    id: 4,
    name: "Python and Django Full Stack Web Developer Bootcamp",
    instructor_name: "AI sweigart",
    price: 800000,
    image: "/course-python.png",
  },
  {
    id: 5,
    name: "Python for Data Science, AI & Development",
    instructor_name: "AI sweigart",
    price: 500000,
    image: "/course-python.png",
  },
  {
    id: 6,
    name: "Go: The Complete Developer's Guide (Golang)",
    instructor_name: "AI sweigart",
    price: 600000,
    image: "/course-python.png",
  },
  {
    id: 7,
    name: "Complete Agile Scrum Master Certification Training",
    instructor_name: "AI sweigart",
    price: 700000,
    image: "/course-python.png",
  },
  {
    id: 8,
    name: "Python and Django Full Stack Web Developer Bootcamp",
    instructor_name: "AI sweigart",
    price: 800000,
    image: "/course-python.png",
  },
  {
    id: 4,
    name: "Python and Django Full Stack Web Developer Bootcamp",
    instructor_name: "AI sweigart",
    price: 800000,
    image: "/course-python.png",
  },
  {
    id: 5,
    name: "Python for Data Science, AI & Development",
    instructor_name: "AI sweigart",
    price: 500000,
    image: "/course-python.png",
  },
  {
    id: 6,
    name: "Go: The Complete Developer's Guide (Golang)",
    instructor_name: "AI sweigart",
    price: 600000,
    image: "/course-python.png",
  },
  {
    id: 7,
    name: "Complete Agile Scrum Master Certification Training",
    instructor_name: "AI sweigart",
    price: 700000,
    image: "/course-python.png",
  },
  {
    id: 8,
    name: "Python and Django Full Stack Web Developer Bootcamp",
    instructor_name: "AI sweigart",
    price: 800000,
    image: "/course-python.png",
  },    
  

  // ... add more courses as needed
];

export default function PaginatedCourseList() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCourse = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - ITEMS_PER_PAGE;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-lg mx-auto text-center md:px-0 px-5">
      <h2 className="text-xl font-semibold mb-4">Purchased Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
