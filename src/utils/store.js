import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice"
import userReducer from "./userSlice"
import bookReducer from "./bookSlice"
import requestReducer from "./requestSlice"

export const store= configureStore({
    reducer: {
        dashboard: dashboardReducer,
        user : userReducer,
        book : bookReducer,
        requests : requestReducer
      },

})