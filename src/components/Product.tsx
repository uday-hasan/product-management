"use client";
import Image from "next/image";
import React, { useEffect } from "react";

import DeleteModal from "./Modals/DeleteModal";
import UpdateProductForm from "./Form/UpdateProductForm";
import ProductDetails from "./ProductDetails";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/lib/app-redux/hooks";
import { getFavourite, setFavourite } from "@/features/products/productSlice";

const Product = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  const { favourite } = useAppSelector((state) => state.products);
  const {
    productImage,
    productPrice,
    productName,
    id,
    productCategory,
    productStatus,
  } = item;
  useEffect(() => {
    dispatch(getFavourite());
  }, [dispatch]);
  const handleFavourite = (id: number) => {
    dispatch(setFavourite(id));
  };

  const isValidImage = productImage.split("/")[2] === "images.unsplash.com";
  return (
    <div className="flex flex-col gap-3 items-center md:items-start justify-between bg-foreground/10 p-4">
      <div className="flex justify-end  w-full">
        <Button
          className={`${
            favourite.includes(id) && "bg-yellow-400 hover:bg-yellow-200"
          }`}
          variant={"outline"}
          onClick={() => handleFavourite(id)}
        >
          <Star className={`${favourite.includes(id) && "text-black"}`} />
        </Button>
      </div>
      {isValidImage ? (
        <Image
          src={productImage}
          alt={productName}
          width={200}
          height={100}
          className="mx-auto"
        />
      ) : (
        <div className="break-words w-full px-4">
          <h1 className="text-lg font-semibold text-destructive text-wrap break-words">
            For this project, image link hostname must be{" "}
            <b>images.unsplash.com</b>
          </h1>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold">{productName}</h1>
        <p className="text-base font-medium">Category: {productCategory}</p>
        <p className="text-base font-medium">Status: {productStatus}</p>
        <p>
          Price:{" "}
          <span className="text-muted-foreground font-bold">
            BDT {productPrice}
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          <ProductDetails item={item} />
          <UpdateProductForm product={item} />
          <DeleteModal id={id} name={productName} />
        </div>
      </div>
    </div>
  );
};

export default Product;
