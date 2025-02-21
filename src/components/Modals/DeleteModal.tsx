"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/app-redux/hooks";
import { deleteProduct } from "@/features/products/productSlice";
import { toast } from "react-toastify";

const DeleteModal = ({ id, name }: { id: number; name: string }) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
    toast("Product deleted successfully.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <AlertDialog>
      <Button asChild variant={"destructive"}>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete{" "}
            <span className="font-semibold text-destructive">{name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
