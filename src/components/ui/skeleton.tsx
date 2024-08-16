export const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CourseDetailSkeleton() {
    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <div className={`${shimmer} relative overflow-hidden h-8 w-3/4 bg-gray-200 rounded mb-4`}></div>
            <div className={`${shimmer} relative overflow-hidden h-6 w-1/2 bg-gray-200 rounded mb-2`}></div>
            <div className={`${shimmer} relative overflow-hidden h-6 w-1/3 bg-gray-200 rounded mb-4`}></div>
            <div className={`${shimmer} relative overflow-hidden h-24 w-full bg-gray-200 rounded mb-6`}></div>

            <div className="mb-4">
                <div className={`${shimmer} relative overflow-hidden h-10 w-full bg-gray-200 rounded mb-4`}></div>
            </div>

            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className={`${shimmer} relative overflow-hidden h-10 w-10 bg-gray-200 rounded-full`}></div>
                        <div className="flex-grow">
                            <div className={`${shimmer} relative overflow-hidden h-6 w-3/4 bg-gray-200 rounded mb-2`}></div>
                            <div className={`${shimmer} relative overflow-hidden h-4 w-1/2 bg-gray-200 rounded`}></div>
                        </div>
                        <div className="flex space-x-2">
                            <div className={`${shimmer} relative overflow-hidden h-8 w-20 bg-gray-200 rounded`}></div>
                            <div className={`${shimmer} relative overflow-hidden h-8 w-20 bg-gray-200 rounded`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}