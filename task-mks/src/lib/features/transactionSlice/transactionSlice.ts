/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { stat } from "fs";

interface TransactionInterface {
  listTransaction: {
    status: string;
    data: any;
  };
  postTransaction: {
    status: string;
    data: any;
  };
  shoppingListData: any;
}

const initialState: TransactionInterface = {
  listTransaction: {
    status: "idle",
    data: [],
  },
  postTransaction: {
    status: "idle",
    data: {},
  },
  shoppingListData: [],
};

export const getListTransaction: any = createAsyncThunk(
  "transaction/getListTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/transaction/index");

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postDataTransaction: any = createAsyncThunk(
  "transaction/postDataTransaction",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/transaction/save", data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addShoopingListData: (state, action: PayloadAction<any>) => {
      state.shoppingListData.push(action.payload);
    },
    resetShoopingListData: (state) => {
        state.shoppingListData = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTransaction.pending, (state) => {
        state.listTransaction.status = "pending";
      })
      .addCase(
        getListTransaction.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.listTransaction.status = "success";
          state.listTransaction.data = action.payload;
        }
      )
      .addCase(getListTransaction.rejected, (state: any) => {
        state.listTransaction.status = "error";
      })
      .addCase(postDataTransaction.pending, (state) => {
        state.postTransaction.status = "pending";
      })
      .addCase(
        postDataTransaction.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.postTransaction.status = "success";
          state.postTransaction.data = action.payload;
        }
      )
      .addCase(postDataTransaction.rejected, (state: any) => {
        state.postTransaction.status = "error";
      });
  },
});

export default transactionSlice.reducer;
export const { addShoopingListData, resetShoopingListData } = transactionSlice.actions;
