"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PostBookForm from "./PostBook";
import MyBook from "./Mybook";
import BrowseBook from "./BrowseBook";
import Request from "./Request";
import MatchmakingPreferences from "./MatchMaking"; // Import the matchmaking component

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 p-6 text-white bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold">Book Exchange</h2>
        <nav className="space-y-4">
          {/* Custom Tabs List */}
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "post" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("post")}
          >
            Post Book
          </button>
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "mybooks" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("mybooks")}
          >
            My Books
          </button>
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "browse" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("browse")}
          >
            Browse Books
          </button>
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "requests" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Requests
          </button>
          <button
            className={`w-full text-left p-2 rounded ${activeTab === "matchmaking" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveTab("matchmaking")}
          >
            Matchmaking
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* Render Content Based on Active Tab */}
        {activeTab === "post" && <PostBookForm />}
        {activeTab === "mybooks" && <MyBook />}
        {activeTab === "browse" && <BrowseBook />}
        {activeTab === "requests" && <Request />}
        {activeTab === "matchmaking" && <MatchmakingPreferences />} {/* New Matchmaking tab */}
      </main>
    </div>
  );
}
