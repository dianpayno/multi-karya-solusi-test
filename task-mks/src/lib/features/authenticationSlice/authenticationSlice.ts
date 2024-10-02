/* eslint-disable @typescript-eslint/no-explicit-any */
import { dataForm } from "@/Interface/menuInterface";
import axiosInstance from "@/lib/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface AuthInterface {
  postLogin: {
    status: string;
    data: any;
  };
  detailUser: {
    status: string;
    data: any;
  }
  
}

const initialState: AuthInterface = {
  postLogin: {
    status: "idle",
    data: null,
  },
  detailUser: {
    status: "idle",
    data: null,
  }
};

export const postDataLogin: any = createAsyncThunk(
  "authentication/postDataLogin",
  async ({ data }: { data: dataForm }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/auth/login",
        data
      );
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getDataDetailUser: any = createAsyncThunk(
  "authentication/getDataDetailUser",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/master/user/detail/${id}`
      );
      
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postDataLogin.pending, (state) => {
        state.postLogin.status = "pending";
      })
      .addCase(postDataLogin.fulfilled, (state:AuthInterface, action: PayloadAction<any>) => {
        console.log(action.payload), 'ini redux'
        state.postLogin.status = "success";
        state.postLogin.data = action.payload;
      })
      .addCase(postDataLogin.rejected, (state:AuthInterface, action: PayloadAction<any>) => {
        state.postLogin.status = "error";
        state.postLogin.data = action.payload.message;
      })
      .addCase(getDataDetailUser.pending, (state) => {
        state.detailUser.status = "pending";
      })
      .addCase(getDataDetailUser.fulfilled, (state:AuthInterface, action: PayloadAction<any>) => {
        console.log(action.payload), 'ini redux'
        state.detailUser.status = "success";
        state.detailUser.data = action.payload;
      })
      .addCase(getDataDetailUser.rejected, (state:AuthInterface, action: PayloadAction<any>) => {
        state.detailUser.status = "error";
        state.detailUser.data = action.payload.message;
      })
  },
  reducers: {},
});

export default authenticationSlice.reducer;
