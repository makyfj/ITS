import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ticketInfo: {
    _id: "",
    category: "",
    description: "",
    dateCreated: "",
    dateResolved: "",
    state: false,
    tags: [],
    user: "",
    currentAssignee: "",
    caseHistory: [],
  },
  ticketStatus: {
    isSuccess: false,
    isFetching: false,
    isError: false,
    errorMessage: "",
  },
  tickets: [
    {
      _id: "",
      category: "",
      description: "",
      dateCreated: "",
      dateResolved: "",
      state: false,
      tags: [],
      user: "",
      currentAssignee: "",
      caseHistory: [],
    },
  ],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    clearTicketStatus: (state) => {
      state.ticketStatus = {
        isSuccess: false,
        isFetching: false,
        isError: false,
        errorMessage: "",
      };
    },
    clearTicketInfo: (state) => {
      state.ticketInfo = {
        _id: "",
        category: "",
        description: "",
        dateCreated: "",
        dateResolved: "",
        state: false,
        tags: [],
        user: "",
        currentAssignee: "",
        caseHistory: [],
      };
    },
  },
});

export const { clearTicketStatus, clearTicketInfo } = ticketSlice.actions;
export default ticketSlice.reducer;
