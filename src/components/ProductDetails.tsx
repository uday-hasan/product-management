"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import Image from "next/image";

const ProductDetails = ({ item }: { item: Product }) => {
  const {
    productImage,
    productPrice,
    productName,
    productCategory,
    productStatus,
    productDescription,
  } = item;
  const isValidImage = productImage.split("/")[2] === "images.unsplash.com";
  return (
    <AlertDialog>
      <Button asChild>
        <AlertDialogTrigger>Details</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3 items-center md:items-start justify-between bg-tone p-4">
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
            <p>Description: {productDescription}</p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductDetails;
