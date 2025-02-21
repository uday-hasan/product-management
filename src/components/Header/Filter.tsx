"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { ProductCategory } from "@/lib/constant";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/app-redux/hooks";
import { setCategory } from "@/features/products/productSlice";
import { Button } from "../ui/button";

const Filter = () => {
  const { category } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  return (
    <Popover>
      <Button asChild variant={"outline"}>
        <PopoverTrigger className="bg-background w-full md:min-w-[200px]">
          Filter
        </PopoverTrigger>
      </Button>

      <PopoverContent className="flex flex-col gap-3">
        {ProductCategory.map((item, index) => (
          <div key={index} className="flex gap-2 items-center ">
            <Checkbox
              value={item}
              checked={category.includes(item)}
              onCheckedChange={(e) => {
                return dispatch(
                  setCategory({
                    value: item as (typeof ProductCategory)[number],
                    isChecked: e as boolean,
                  })
                );
              }}
            />
            <Label>{item}</Label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
