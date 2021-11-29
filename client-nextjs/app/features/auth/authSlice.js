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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.API_URL}/api/users/login`,
        { email, password }
      );

      if (status === 200) {
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

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
});

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };
      const { data, status } = await axios.get(
        `${process.env.API_URL}/api/users/${userId}`,
        config
      );

      if (status === 200) {
        // Add token to state
        data.token = auth.userInfo.token;

        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, name, email, password, isAdmin }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.put(
        `${process.env.API_URL}/api/users/${userId}`,
        {
          name,
          email,
          password,
          isAdmin,
        },
        config
      );

      if (status === 200) {
        data.token = localStorage.getItem("token");
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data, status } = await axios.delete(
        `${process.env.API_URL}/api/users/${userId}`,
        config
      );

      if (status === 200) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Only for admin
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
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
        `${process.env.API_URL}/api/users/all`,
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
  userInfo: {
    _id: "",
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    token: "",
  },
  status: {
    isSuccess: false,
    isFetching: false,
    isError: false,
    errorMessage: "",
  },
  users: [
    {
      _id: "",
      name: "",
      email: "",
      password: "",
      isAdmin: false,
      token: "",
    },
  ],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = {
        isSuccess: false,
        isFetching: false,
        isError: false,
        errorMessage: "",
      };
    },
    clearUserInfo: (state) => {
      state.userInfo = {
        _id: "",
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        token: "",
      };
    },
    clearUsers: (state) => {
      state.users = {
        _id: "",
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        token: "",
      };
    },
  },

  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.status.isFetching = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.status.isError = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = payload;
    });

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.status.isFetching = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.status.isError = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = payload;
    });

    // Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.status.isFetching = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userInfo = {
        _id: "",
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        token: "",
      };
      state.status.isSuccess = false;
      state.status.isFetching = false;
      state.status.isError = false;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = "Can't logout";
    });

    // Get User
    builder.addCase(getUser.pending, (state) => {
      state.status.isFetching = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.status.isError = false;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isSuccess = false;
      state.status.isError = true;
      state.status.errorMessage = payload;
    });

    // Update User
    builder.addCase(updateUser.pending, (state) => {
      state.status.isFetching = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.status.isError = false;
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = payload;
    });

    // Delete User
    builder.addCase(deleteUser.pending, (state) => {
      state.status.isFetching = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.userInfo = {};
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.status.isError = false;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = payload;
    });

    // All Users
    builder.addCase(getAllUsers.pending, (state) => {
      state.status.isFetching = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.users = { ...state.users, ...payload };
      state.status.isSuccess = true;
      state.status.isFetching = false;
      state.status.isError = false;
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.status.isFetching = false;
      state.status.isError = true;
      state.status.errorMessage = payload;
    });
  },
});

export const { clearStatus, clearUserInfo } = authSlice.actions;

export default authSlice.reducer;
