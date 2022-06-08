// without BE
/* import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "huseyin",
    email: "turkmenogluhuseyin@gmail.com",
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    remove: (state) => (state = {}),
    addHello: (state, action) => {
      state.name = `Hello ${action.payload.name}`;
    },
  },
});

console.dir(userSlice);
export const { update, remove,addHello } = userSlice.actions;
export default userSlice.reducer; */

// with BE
/* import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "huseyin",
      email: "turkmenogluhuseyin@gmail.com"
    },
    pending: null,
    error: false
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
    },
    updateError: (state) => { 
      state.error = true;
      state.pending = false;
    }
  },
});

export const  { updateStart, updateSuccess, updateError } = userSlice.actions;
export default userSlice.reducer; */

// with BE, createAsyncThunk, axios
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk("user/update", async (user) => {
  const response = await axios.post(
    "http://localhost:8800/api/users/123/update",
    user
  );
  return response.data;
});

export const deleteUser = createAsyncThunk("user/delete", async (user) => {
  const response = await axios.delete(
    "http://localhost:8800/api/users/123/delete",
    user
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "huseyin",
      email: "turkmenogluhuseyin@gmail.com",
    },
    pending: null,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.pending = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
    },
    [updateUser.rejected]: (state) => {
      state.error = true;
      state.pending = null;
    },
    [deleteUser.pending]: (state) => {
      state.pending = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
      state.pending = false;
    },
    [deleteUser.rejected]: (state) => {
      state.error = true;
      state.pending = null;
    },
  },
});

export const { updateStart, updateSuccess, updateError } = userSlice.actions;
export default userSlice.reducer;
