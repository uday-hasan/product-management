"use client";
import { ProductCategory, productStatus } from "@/lib/constant";
import AllProduct from "./product/all-product/page";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/app-redux/hooks";
import { getProducts } from "@/features/products/productSlice";

const mockData: Product[] = [
  {
    id: 1,
    productImage:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    productName: "Product 1",
    productPrice: 100,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[1],
    productStatus: productStatus[0],
  },
  {
    id: 2,
    productImage:
      "https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlfGVufDB8fDB8fHww",
    productName: "Product 2",
    productPrice: 300,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[0],
    productStatus: productStatus[1],
  },
  {
    id: 3,
    productImage:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    productName: "Product 3",
    productPrice: 1000,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[2],
    productStatus: productStatus[2],
  },
  {
    id: 4,
    productImage:
      "https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlfGVufDB8fDB8fHww",
    productName: "Product 4",
    productPrice: 10000,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[1],
    productStatus: productStatus[0],
  },
  {
    id: 5,
    productImage:
      "https://images.unsplash.com/photo-1471279136892-55af5dc6895f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFibGV0fGVufDB8fDB8fHww",
    productName: "Product 5",
    productPrice: 700,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[1],
    productStatus: productStatus[0],
  },
  {
    id: 6,
    productImage:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    productName: "Product 6",
    productPrice: 100,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[0],
    productStatus: productStatus[0],
  },
  {
    id: 7,
    productImage:
      "https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlfGVufDB8fDB8fHww",
    productName: "Product 7",
    productPrice: 130,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[1],
    productStatus: productStatus[0],
  },
  {
    id: 8,
    productImage:
      "https://images.unsplash.com/photo-1471279136892-55af5dc6895f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFibGV0fGVufDB8fDB8fHww",
    productName: "Product 8",
    productPrice: 800,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[1],
    productStatus: productStatus[2],
  },
  {
    id: 9,
    productImage:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    productName: "Product 9",
    productPrice: 100,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[1],
    productStatus: productStatus[0],
  },
  {
    id: 10,
    productImage:
      "https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlfGVufDB8fDB8fHww",
    productName: "Product 10",
    productPrice: 100500,
    productDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    productCategory: ProductCategory[1],
    productStatus: productStatus[0],
  },
];

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const isExist = localStorage.getItem("products");
    if (!isExist || JSON.parse(isExist).length === 0) {
      localStorage.setItem("products", JSON.stringify(mockData));
      dispatch(getProducts());
    }
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome User.</h1>
      <AllProduct />
    </div>
  );
};

export default Home;
