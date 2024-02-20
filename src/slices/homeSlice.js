import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    chatHistory: [],
  },
  reducers: {
    saveChat: (state, action) => {
      state.chatHistory.push(action.payload.chat);
    },
    addFeedback: (state, action) => {
      state.chatHistory[action.payload.index].feedBack = action.payload.feedBack;
    },
    addLinks: (state, action) => {
      state.chatHistory[state.chatHistory.length - 1].links = action.payload.links;
    },
  },
});
export const { saveChat, addFeedback, addLinks } = homeSlice.actions;

export default homeSlice.reducer;
