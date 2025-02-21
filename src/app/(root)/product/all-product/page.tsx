"use client";
import React, { useEffect } from "react";

import { getProducts } from "@/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/app-redux/hooks";
import Product from "@/components/Product";
import ProductSkeleton from "@/components/ProductSkeleton";
const AllProduct = () => {
  const { products, isLoading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {new Array(6).fill("").map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item, index) => (
            <Product item={item} key={index} />
          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-semibold">No products found</h1>
      )}
    </div>
  );
};

export default AllProduct;
