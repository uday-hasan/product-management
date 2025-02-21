"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeControll from "../Form/theme/ThemeControll";

const NavigationOptions = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "All Product",
    href: "/product/all-product",
  },
  {
    title: "Add Product",
    href: "/product/add-product",
  },
];

const SideNav = () => {
  const pathname = usePathname();
  return (
    <>
      <aside className="flex flex-col gap-6">
        {NavigationOptions.map((item) => (
          <Button
            asChild
            variant={pathname === item.href ? "outline" : "default"}
            key={item.href}
            className="w-full border"
          >
            <Link href={item.href}>{item.title}</Link>
          </Button>
        ))}
        <div className="hidden md:block w-full">
          <ThemeControll />
        </div>
      </aside>
    </>
  );
};

export default SideNav;
