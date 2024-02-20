import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "sessionSlice",
  initialState: {
    token: "",
  },
  reducers: {
    startSession: (state, action) => {
      state.token = action.payload.token;
    },
    endSession: (state, action) => {
      state.token = "";
    },
  },
});
export const { startSession, endSession } = sessionSlice.actions;

export default sessionSlice.reducer;
