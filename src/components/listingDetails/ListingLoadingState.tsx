/**
 * empty state component for listings
 * @returns 
 */

export const ListingLoadingState: React.FC = () => (
  <>
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        className="animate-pulse bg-gray-100 flex flex-col items-center justify-between h-[12rem] rounded-lg border border-gray-200 p-2 transition-all duration-150"
        key={i}
      ></div>
    ))}
  </>
);
