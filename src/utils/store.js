import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice"
import userReducer from "./userSlice"

export const store= configureStore({
    reducer: {
        dashboard: dashboardReducer,
        user : userReducer
      },

})