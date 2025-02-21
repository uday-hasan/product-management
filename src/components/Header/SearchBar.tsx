"use client";
import React from "react";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/lib/app-redux/hooks";
import { setSearch } from "@/features/products/productSlice";
import { debounce } from "@/lib/action";
const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleChange = debounce((e: string) => {
    dispatch(setSearch(e));
  });

  return (
    <div className="flex-[4] border bg-background">
      <Input
        placeholder="Search product by name"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default SearchBar;
