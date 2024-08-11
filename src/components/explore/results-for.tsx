"use client";
import { useSearchParams } from "next/navigation";


export default function ResultFor(){
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  return (
    <div className="py-4">
      <h1 className="font-bold text-xl">Results for &quot;{name}&quot;</h1>
    </div>
  )
}