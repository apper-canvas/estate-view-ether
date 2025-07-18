import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Search/Filter Skeleton */}
      <div className="space-y-4">
        <div className="h-12 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded-lg" />
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded-lg" />
          <div className="h-10 w-32 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded-lg" />
        </div>
      </div>

      {/* Property Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Image Skeleton */}
            <div className="aspect-[4/3] bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer" />
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-3/4" />
                <div className="h-8 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-1/2" />
              </div>
              
              <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-full" />
              
              <div className="flex gap-4">
                <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-16" />
                <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-16" />
                <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 bg-[length:200px_100%] animate-shimmer rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;