"use client";

import { useState, useEffect } from "react";
import { LogoutButton } from "./Logout";
import PostBookForm from "./PostBook";
import { MyBooks } from "./MyBooks";
import { BrowseBooks } from "./BrowseBook";
import Request from "./Request";
import MatchmakingPreferences from "./MatchMaking";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setuser } from "@/utils/userSlice"; 
import { Button } from "@/components/ui/button"; 

export default function DashboardLayout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("post");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {

    if (!user) {

      const storedUser = localStorage.getItem("user");
      if (storedUser) {

        dispatch(setuser(JSON.parse(storedUser)));
      } else {

        router.push("/");
      }
    }
  }, [user, dispatch, router]);


  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex flex-col justify-between w-64 p-6 text-white bg-gray-900">
        <div>
          <h2 className="mb-6 text-2xl font-bold text-center">Book Exchange</h2>
          <nav className="space-y-4">
            {/* Custom Tabs List */}
            <Button
              variant={activeTab === "post" ? "default" : "ghost"}
              className="justify-start w-full"
              onClick={() => setActiveTab("post")}
            >
              Post Book
            </Button>
            <Button
              variant={activeTab === "mybooks" ? "default" : "ghost"}
              className="justify-start w-full"
              onClick={() => setActiveTab("mybooks")}
            >
              My Books
            </Button>
            <Button
              variant={activeTab === "browse" ? "default" : "ghost"}
              className="justify-start w-full"
              onClick={() => setActiveTab("browse")}
            >
              Browse Books
            </Button>
            <Button
              variant={activeTab === "requests" ? "default" : "ghost"}
              className="justify-start w-full"
              onClick={() => setActiveTab("requests")}
            >
              Requests
            </Button>
            <Button
              variant={activeTab === "matchmaking" ? "default" : "ghost"}
              className="justify-start w-full"
              onClick={() => setActiveTab("matchmaking")}
            >
              Matchmaking
            </Button>
          </nav>
        </div>

        <div className="mt-6">
          <LogoutButton />
        </div>
      </aside>


      <main className="flex-1 p-8 overflow-auto bg-gray-100">

        {activeTab === "post" && <PostBookForm />}
        {activeTab === "mybooks" && <MyBooks />}
        {activeTab === "browse" && <BrowseBooks />}
        {activeTab === "requests" && <Request />}
        {activeTab === "matchmaking" && <MatchmakingPreferences />}
      </main>
    </div>
  );
}
