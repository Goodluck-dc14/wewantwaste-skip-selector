export const SkipCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 animate-fade-in">
      <div className="space-y-4">
        {/* Size indicator skeleton */}
        <div className="animate-pulse bg-gray-200 rounded-full h-6 w-full"></div>

        {/* Title skeleton */}
        <div className="animate-pulse bg-gray-200 rounded h-6 w-3/4"></div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
          <div className="animate-pulse bg-gray-200 rounded h-4 w-2/3"></div>
        </div>

        {/* Price skeleton */}
        <div className="animate-pulse bg-gray-200 rounded h-8 w-1/2"></div>

        {/* Button skeleton */}
        <div className="animate-pulse bg-gray-200 rounded-xl h-12 w-full"></div>
      </div>
    </div>
  )
}
