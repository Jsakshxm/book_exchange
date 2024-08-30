import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sentRequests: [],
  receivedRequests: [],
};

const requestSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setSentRequests: (state, action) => {
      state.sentRequests = action.payload;
    },
    setReceivedRequests: (state, action) => {
      state.receivedRequests = action.payload;
    },
    addSentRequest: (state, action) => {
      state.sentRequests.push(action.payload);
    },
    updateSentRequestStatus: (state, action) => {
      const { requestId, status } = action.payload;
      const request = state.sentRequests.find(r => r.id === requestId);
      if (request) {
        request.status = status;
      }
    },
    updateReceivedRequestStatus: (state, action) => {
      const { requestId, status } = action.payload;
      const request = state.receivedRequests.find(r => r.id === requestId);
      if (request) {
        request.status = status;
      }
    },
  },
});

export const {
  setSentRequests,
  setReceivedRequests,
  addSentRequest,
  updateSentRequestStatus,
  updateReceivedRequestStatus,
} = requestSlice.actions;

export default requestSlice.reducer;
