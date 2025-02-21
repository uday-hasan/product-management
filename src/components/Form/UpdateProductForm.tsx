"use client";
import { useAppDispatch, useAppSelector } from "@/lib/app-redux/hooks";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateProduct } from "@/features/products/productSlice";
import CustomInput from "./CustomInput";
import {
  FormFieldType,
  ProductCategory,
  productStatus as status,
} from "@/lib/constant";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { addProductSchema } from "@/lib/zod/AddProductSchema";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const UpdateProductForm = ({ product }: { product: Product }) => {
  const {
    id,
    productCategory,
    productImage,
    productName,
    productPrice,
    productStatus,
    productDescription,
  } = product;
  const { isLoading } = useAppSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productName: productName || "",
      productPrice: productPrice || 0,
      productImage: productImage || "",
      productCategory:
        (productCategory as (typeof ProductCategory)[number]) ||
        ProductCategory[0],
      productStatus: (productStatus as (typeof status)[number]) || status[0],
      productDescription: productDescription || "",
    },
  });
  useEffect(() => {
    form.reset({
      productName: product.productName || "",
      productPrice: product.productPrice || 0,
      productImage: product.productImage || "",
      productCategory:
        (product.productCategory as (typeof ProductCategory)[number]) ||
        ProductCategory[0],
      productStatus:
        (product.productStatus as (typeof status)[number]) || status[0],
      productDescription: product.productDescription || "",
    });
  }, [id, form, product]);

  if (isLoading) {
    return <h1>Loading... ...</h1>;
  }
  if (!product) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">No product found to update</h1>
        <div>
          <Button asChild>
            <Link href="/product/all-product">Go to product</Link>
          </Button>
        </div>
      </div>
    );
  }
  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    const response = await dispatch(
      updateProduct({ ...values, id: Number(id) })
    );
    if (response.meta.requestStatus === "fulfilled") {
      form.reset();
      setOpen(false);
      toast("Product updated successfully.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <AlertDialog
      onOpenChange={(e) => setOpen(e)}
      defaultOpen={false}
      open={open}
    >
      <Button asChild onClick={() => setOpen(true)}>
        <AlertDialogTrigger>Update</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update product form</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 bg-tone py-2 px-8"
            >
              <CustomInput
                control={form.control}
                type={FormFieldType.TEXT}
                label="Enter product name"
                name="productName"
              />
              <CustomInput
                control={form.control}
                name="productPrice"
                type={FormFieldType.NUMBER}
                label="Product Price"
              />
              <CustomInput
                control={form.control}
                name="productCategory"
                type={FormFieldType.SELECT}
                label="Product Category"
                selectData={[...ProductCategory]}
                defaultSelectValue={product.productCategory}
              />
              <CustomInput
                control={form.control}
                name="productStatus"
                type={FormFieldType.SELECT}
                label="Product Status"
                selectData={[...status]}
                defaultSelectValue={product.productStatus}
              />
              <CustomInput
                control={form.control}
                name="productImage"
                type={FormFieldType.TEXT}
                label="Product Image"
              />
              <CustomInput
                control={form.control}
                name="productDescription"
                type={FormFieldType.TEXTAREA}
                label="Product Description"
              />
              <div className="space-x-2">
                <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                <Button type="submit" size={"sm"}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          {/* </AlertDialogDescription> */}
        </AlertDialogHeader>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateProductForm;
