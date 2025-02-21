import { z } from "zod";
import { ProductCategory, productStatus } from "../constant";

export const addProductSchema = z.object({
  productName: z.string().nonempty("Product Name is required"),
  productPrice: z.number().positive("Price should be positive"),
  productImage: z.string().nonempty("Product Image is required"),
  productCategory: z.enum(ProductCategory).default(ProductCategory[0]),
  productStatus: z.enum(productStatus).default(productStatus[0]),
  productDescription: z.string().optional(),
});

export type addProductSchema = z.infer<typeof addProductSchema>;
