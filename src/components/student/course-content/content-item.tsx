"use client";

import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Content } from "@/app/types";

interface ContentItemProps {
    content: Content;
    courseId: string;
    userId: string;
    userToken: string;
}

export default function ContentItem({ content, courseId, userId, userToken }: ContentItemProps) {
    const [isFinished, setIsFinished] = useState(0);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/progress/${courseId}/${content.id}/${userId}`,
                    { headers: { Authorization: `Bearer ${userToken}` } }
                );
                setIsFinished(response.data.progress.isFinish);
            } catch (error) {
                console.error("Error fetching progress:", error);
            }
        };

        fetchProgress();
    }, [courseId, content.id, userId, userToken]);

    const handleCheckboxClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const newValue = isFinished === 0 ? 1 : 0;
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/progress/${courseId}/${content.id}/${userId}`,
                { isFinish: newValue },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );

            if (response.status === 201) {
                setIsFinished(newValue);
            }
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    return (
        <Link
            href={`/courses/learn/${courseId}/${content.id}`}
            className="flex items-center justify-between hover:bg-muted/50 px-2 py-1 rounded-md"
            prefetch={false}
        >
            <div className="flex items-center space-x-2">
                <div
                    className={`w-5 h-5 border rounded-sm cursor-pointer flex items-center justify-center ${
                        isFinished > 0 ? "bg-primary border-primary" : "border-gray-300"
                    }`}
                    onClick={handleCheckboxClick}
                >
                    {isFinished > 0 && (
                        isFinished === 1 ?
                            <Check className="w-4 h-4 text-white" /> :
                            <span className="text-white text-xs font-bold">{isFinished}</span>
                    )}
                </div>
                <span>{content.title}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
        </Link>
    );
}