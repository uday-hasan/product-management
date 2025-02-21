"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppDispatch } from "@/lib/app-redux/hooks";
import { setSort } from "@/features/products/productSlice";

const SortingOptions = ["None", "High to Low", "Low to High"] as const;
type SortingOptions = (typeof SortingOptions)[number];

const Sort = () => {
  const dispatch = useAppDispatch();
  const handleSort = (value: SortingOptions) => {
    dispatch(setSort(value));
  };
  return (
    <div className="flex-[1] border bg-background w-full">
      <Select
        defaultValue={SortingOptions[0]}
        onValueChange={(e) => handleSort(e as SortingOptions)}
      >
        <SelectTrigger>
          <SelectValue placeholder={SortingOptions[0]} />
        </SelectTrigger>
        <SelectContent className="px-4 max-w-[200px]">
          {SortingOptions.map((item, index) => (
            <SelectItem
              value={item}
              key={index}
              onClick={() => handleSort(item)}
              className="mb-2 cursor-pointer px-4 py-2"
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
