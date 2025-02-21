"use client";
import { Skeleton } from "./ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 items-center md:items-start justify-between bg-tone p-4 min-h-[250px]">
      <Skeleton className="w-[200px] h-[100px]" />

      <div className="flex flex-col gap-6">
        <Skeleton className="w-[100px] h-[10px]" />
        <Skeleton className="w-[100px] h-[10px]" />
        <Skeleton className="w-[100px] h-[10px]" />
        <Skeleton className="w-[100px] h-[10px]" />

        <div className="flex md:flex-wrap gap-3">
          <Skeleton className="w-[40px] h-[10px]" />
          <Skeleton className="w-[40px] h-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
