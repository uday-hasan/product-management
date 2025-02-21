"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { addProduct } from "@/features/products/productSlice";
import {
  FormFieldType,
  ProductCategory,
  productStatus,
} from "@/lib/constant/index";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppDispatch } from "@/lib/app-redux/hooks";
import { toast } from "react-toastify";
import { addProductSchema } from "@/lib/zod/AddProductSchema";

const AddProductForm = () => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      productName: "",
      productPrice: 0,
      productImage: "",
      productCategory: ProductCategory[0],
      productStatus: productStatus[0],
    },
  });
  async function onSubmit(values: z.infer<typeof addProductSchema>) {
    const existingProducts = localStorage.getItem("products");
    let newItem;
    if (!existingProducts) {
      newItem = { ...values, id: 1 };
    } else {
      const items = JSON.parse(existingProducts);
      const maxId = Math.max(
        ...items.map((item: Product) => Number(item.id)),
        0
      );

      newItem = { ...values, id: maxId + 1 };
    }
    const response = await dispatch(addProduct(newItem));
    if (response.meta.requestStatus === "fulfilled") {
      form.reset();
      toast("Product added successfully.", {
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
        />
        <CustomInput
          control={form.control}
          name="productStatus"
          type={FormFieldType.SELECT}
          label="Product Status"
          selectData={[...productStatus]}
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
