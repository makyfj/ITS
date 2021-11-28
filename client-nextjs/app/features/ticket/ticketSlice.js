import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async ({ category, description, tags, currentAssignee }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.post(
        `${process.env.API_URL}/api/tickets/ticket`,
        { category, description, tags, currentAssignee },
        config
      );

      if (status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
  extraReducers: (builder) => {
    // Create Ticket
    builder.addCase(createTicket.pending, (state) => {
      state.ticketStatus.isFetching = true;
    });
    builder.addCase(createTicket.fulfilled, (state, { payload }) => {
      state.ticketInfo = payload;
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isSuccess = true;
      state.ticketStatus.isError = false;
    });
    builder.addCase(createTicket.rejected, (state, { payload }) => {
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isError = true;
      state.ticketStatus.errorMessage = payload;
    });
  },
});

export const { clearTicketStatus, clearTicketInfo } = ticketSlice.actions;
export default ticketSlice.reducer;
