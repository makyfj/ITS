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

export const getTicket = createAsyncThunk(
  "ticket/getTicket",
  async (_id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.get(
        `${process.env.API_URL}/api/tickets/${_id}`,
        config
      );

      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTicket = createAsyncThunk(
  "ticket/updateTicket",
  async (
    { _id, category, description, tags, state, currentAssignee },
    thunkAPI
  ) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.put(
        `${process.env.API_URL}/api/tickets/${_id}`,
        { category, description, tags, state, currentAssignee },
        config
      );

      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async (_id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.delete(
        `${process.env.API_URL}/api/tickets/${_id}`,
        config
      );

      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllTickets = createAsyncThunk(
  "ticket/getAllTickets",
  async (_id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.get(
        `${process.env.API_URL}/api/tickets`,
        config
      );

      if (status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserTickets = createAsyncThunk(
  "ticket/getUserTickets",
  async (_id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.get(
        `${process.env.API_URL}/api/tickets/user/${_id}`,
        config
      );

      if (status === 200) {
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
  userTickets: [
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
  categories: [],
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
    clearTickets: (state) => {
      state.tickets = [
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
      ];
    },
    clearUserTickets: (state) => {
      state.userTickets = [
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
      ];
    },
    addCategory: (state, { payload }) => {
      state.categories = [...payload];
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

    // Get Ticket
    builder.addCase(getTicket.pending, (state) => {
      state.ticketStatus.isFetching = true;
    });
    builder.addCase(getTicket.fulfilled, (state, { payload }) => {
      state.ticketInfo = payload;
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isSuccess = true;
      state.ticketStatus.isError = false;
    });
    builder.addCase(getTicket.rejected, (state, { payload }) => {
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isError = true;
      state.ticketStatus.errorMessage = payload;
    });

    // Update Ticket
    builder.addCase(updateTicket.pending, (state) => {
      state.ticketStatus.isFetching = true;
    });
    builder.addCase(updateTicket.fulfilled, (state, { payload }) => {
      state.ticketInfo = payload;
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isSuccess = true;
      state.ticketStatus.isError = false;
    });
    builder.addCase(updateTicket.rejected, (state, { payload }) => {
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isError = true;
      state.ticketStatus.errorMessage = payload;
    });

    // Delete Ticket
    builder.addCase(deleteTicket.pending, (state) => {
      state.ticketStatus.isFetching = true;
    });
    builder.addCase(deleteTicket.fulfilled, (state) => {
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
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isSuccess = true;
      state.ticketStatus.isError = false;
    });
    builder.addCase(deleteTicket.rejected, (state, { payload }) => {
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isError = true;
      state.ticketStatus.errorMessage = payload;
    });

    // Get All Tickets
    builder.addCase(getAllTickets.pending, (state) => {
      state.ticketStatus.isFetching = true;
    });
    builder.addCase(getAllTickets.fulfilled, (state, { payload }) => {
      state.tickets = [...payload];
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isSuccess = true;
      state.ticketStatus.isError = false;
    });
    builder.addCase(getAllTickets.rejected, (state, { payload }) => {
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isError = true;
      state.ticketStatus.errorMessage = payload;
    });

    // Get User Tickets
    builder.addCase(getUserTickets.pending, (state) => {
      state.ticketStatus.isFetching = true;
    });
    builder.addCase(getUserTickets.fulfilled, (state, { payload }) => {
      state.userTickets = [...payload];
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isSuccess = true;
      state.ticketStatus.isError = false;
    });
    builder.addCase(getUserTickets.rejected, (state, { payload }) => {
      state.ticketStatus.isFetching = false;
      state.ticketStatus.isError = true;
      state.ticketStatus.errorMessage = payload;
    });
  },
});

export const {
  clearTicketStatus,
  clearTicketInfo,
  clearTickets,
  clearUserTickets,
  addCategory,
} = ticketSlice.actions;
export default ticketSlice.reducer;
