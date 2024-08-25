"use client";
import Auth from "@/components/shared/Auth";
import { store } from "@/utils/store";
import { Provider } from "react-redux";


export default function Home() {
  return (
    <Provider store={store}>
   <Auth />
        </Provider>
  );
}
