import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: {},
  status: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = {};
    },
    clearUserInfo: (state) => {
      state.userInfo = {};
    },
  },
});

export const { clearStatus, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
