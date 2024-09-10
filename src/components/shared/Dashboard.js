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
import { FiMenu } from "react-icons/fi"; // For the menu icon

export default function DashboardLayout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("post");
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle
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
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-4 text-white bg-gray-900 md:hidden">
        <h2 className="text-xl font-bold">Book Exchange</h2>
        <button
          className="text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 p-6 transition-transform transform bg-gray-900 text-white md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex md:flex-col`}
      >
        <div className="flex-grow">
          <h2 className="mb-6 text-2xl font-bold text-center">Book Exchange</h2>
          <nav className="space-y-4">
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

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 pt-16 overflow-auto bg-gray-100 md:pt-8">
        {activeTab === "post" && <PostBookForm />}
        {activeTab === "mybooks" && <MyBooks />}
        {activeTab === "browse" && <BrowseBooks />}
        {activeTab === "requests" && <Request />}
        {activeTab === "matchmaking" && <MatchmakingPreferences />}
      </main>
    </div>
  );
}
