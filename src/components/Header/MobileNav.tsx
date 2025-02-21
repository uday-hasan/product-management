"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import SideNav from "../Navigation/SideNav";
import Filter from "./Filter";
import Sort from "./Sort";
import { Label } from "../ui/label";
import { Menu } from "lucide-react";
import ThemeControll from "../Form/theme/ThemeControll";
const MobileNav = () => {
  return (
    <Sheet>
      <Button variant={"outline"} asChild>
        <SheetTrigger className="">
          <Menu />
        </SheetTrigger>
      </Button>
      <SheetContent className="max-w-[260px]">
        <SheetHeader>
          <SheetTitle>Welcome User</SheetTitle>
          <SheetDescription></SheetDescription>
          <div>
            <SideNav />
          </div>
          <div className="flex items-start my-2 gap-3 justify-between">
            <ThemeControll />
            <Filter />
          </div>
          <div className="flex flex-col items-start ">
            <Label className="text-lg font-semibold">Sort</Label>
            <Sort />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
