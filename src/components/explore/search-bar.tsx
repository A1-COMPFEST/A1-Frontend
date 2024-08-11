"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
export default function SearchBar() {
  const [name, setName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", name);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center">
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Search for courses..."
          defaultValue={searchParams.get("name")?.toString()}
          className="flex-grow"
        />
        <Button type="submit" className="ml-2" variant={"outline"}>
          Search
        </Button>
      </form>
    </div>
  );
}
