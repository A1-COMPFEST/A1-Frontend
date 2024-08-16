import { Suspense } from 'react';
import CourseDetailPage from "@/app/instructor/dashboard/course/[id]/course-detail-page";
import {CourseDetailSkeleton} from "@/components/ui/skeleton";

export default function Page({ params, searchParams }: { params: { id: string }, searchParams: { tab?: string } }) {
    return (
        <Suspense fallback={<CourseDetailSkeleton />}>
            <CourseDetailPage params={params} searchParams={searchParams} />
        </Suspense>
    );
}