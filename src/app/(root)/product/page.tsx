"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProductPage = () => {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (path === "/product") {
      router.replace("/product/all-product");
    }
  }, [path, router]);
  return null;
};

export default ProductPage;
