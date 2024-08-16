"use client";

import ContentItem from "@/components/student/course-content/content-item";
import { Content } from "@/app/types";

interface ContentListProps {
    contents: Content[];
    courseId: string;
    userId: string;
    userToken: string;
}

export default function ContentList({ contents, courseId, userId, userToken }: ContentListProps) {
    return (
        <div className="grid text-primary gap-2 mt-4">
            {contents.map((content: Content) => (
                <ContentItem
                    key={content.id}
                    content={content}
                    courseId={courseId}
                    userId={userId}
                    userToken={userToken}
                />
            ))}
        </div>
    );
}