"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";

interface PaginationClientProps {
  last_page: number;
  current_page: number;
}

export default function PaginationClient({
  last_page,
  current_page,
}: PaginationClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, current_page - 1))}
            className={
              current_page === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
        {[...Array(last_page)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => handlePageChange(index + 1)}
              isActive={current_page === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePageChange(Math.min(last_page, current_page + 1))
            }
            className={
              current_page === last_page ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
