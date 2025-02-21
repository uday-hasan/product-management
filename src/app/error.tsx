"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold text-destructive">{error.message}</h1>
      <Button asChild>
        <Link href={"/add-product"}>Go to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
