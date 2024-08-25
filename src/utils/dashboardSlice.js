
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTab: 'Post Book',  
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = dashboardSlice.actions;
export default dashboardSlice.reducer;
