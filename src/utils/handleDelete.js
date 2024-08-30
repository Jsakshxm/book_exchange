"use client";
import { supabase } from "@/utils/supabase";
import { toast } from "react-toastify";
import { RemoveBook } from "@/utils/bookSlice";
import { useDispatch } from "react-redux";

export const handleDelete = async (book) => {
  const dispatch = useDispatch();
  
  const { error } = await supabase
    .from("books")
    .delete()
    .eq("id", book.id); 

  if (error) {
    console.error("Error deleting book:", error);
  } else {
    toast.warn("Book deleted successfully!");
    dispatch(RemoveBook(book.id)); // Remove book from Redux state
  }
};
