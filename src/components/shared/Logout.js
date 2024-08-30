"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 
import {toast} from "react-toastify";
import { supabase } from "@/utils/supabase"; 
export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
    
    toast.error("Error logging out: " + error.message);
    } else {
      
      toast.success("Logged out successfully", { autoClose: 2000});
      router.push("/"); 
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="text-gray-900">
      Logout
    </Button>
  );
}
