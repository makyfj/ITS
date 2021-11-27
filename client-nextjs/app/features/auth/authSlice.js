import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, name, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.API_URL}/api/users/register`,
        { email, name, password }
      );

      if (status === 201) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data));
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
  userInfo: {
    name: "",
    email: "",
    password: "",
  },
  status: {
    isSuccess: false,
    isFetching: false,
    isError: false,
    errorMessage: "",
  },
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

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status.isFetching = true;
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.status.isError = false;
    });

    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = error.message;
    });
  },
});

export const { clearStatus, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;
