"use client"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab } from '@/store/dashboardSlice';
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.dashboard.selectedTab);
  
  const tabs = ["Post Book", "My Books", "Browse Books", "Requests"];

  return (
    <div className="w-64 p-6 bg-white border-r dark:bg-gray-800">
      <h2 className="text-lg font-semibold dark:text-white">Dashboard</h2>
      <ul className="mt-6 space-y-4">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={cn(
              "cursor-pointer p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
              selectedTab === tab ? "text-blue-600 font-bold" : "text-gray-700 dark:text-gray-400"
            )}
            onClick={() => dispatch(setSelectedTab(tab))}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};
