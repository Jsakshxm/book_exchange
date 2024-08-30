import { supabase } from "@/utils/supabase";

export const fetchBooks = async (userId, dispatch, SetBooks) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("user_id", userId); 

  if (error) {
    console.error("Error fetching books:", error);
  } else {
    console.log("Fetched books:", data);
    dispatch(SetBooks(data)); // Dispatch fetched books to Redux store
  }
};
