/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/lib/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserInterface {
  listAllUser: {
    status: string;
    dataEmployee: any;
    dataCustomers: any;
  };
  postNewData: {
    status: string;
  };
}

const initialState: UserInterface = {
  listAllUser: {
    status: "idle",
    dataEmployee: [],
    dataCustomers: [],
  },
  postNewData: {
    status: "idle",
  },
};

export const getListAllUser: any = createAsyncThunk(
  "user/getListAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/master/user/index");

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postDataNewCustomer: any = createAsyncThunk(
  "user/postDataNewCustomer",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/master/user/save_customer", data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getListAllUser.pending, (state) => {
        state.listAllUser.status = "pending";
      })
      .addCase(
        getListAllUser.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.listAllUser.status = "success";
          const newDataEmployee = action.payload.filter(
            (item: any) => item.detail_type == "mst_employee"
          );
          const newDataCustomer = action.payload.filter(
            (item: any) => item.detail_type == "mst_customer"
          );
          state.listAllUser.dataEmployee = newDataEmployee;
          state.listAllUser.dataCustomers = newDataCustomer;
        }
      )
      .addCase(getListAllUser.rejected, (state: any) => {
        state.listAllUser.status = "error";
      })
      .addCase(postDataNewCustomer.pending, (state: any) => {
        state.postNewData.status = "pending";
      })
      .addCase(
        postDataNewCustomer.fulfilled,
        (state: any) => {
          state.postNewData.status = "success";
        }
      )
      .addCase(postDataNewCustomer.rejected, (state: any) => {
        state.postNewData.status = "error";
      });
  },
  reducers: {},
});

export default userSlice.reducer;
