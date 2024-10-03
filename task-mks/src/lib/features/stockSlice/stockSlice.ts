/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface StockInterface {
  listAllStock: {
    status: string;
    data: any;
  };
  listCategoryItem: {
    status: string;
    data: any;
  };
  postDataStock: {
    status: string;
    data: any;
  };
}

const initialState: StockInterface = {
  listAllStock: {
    status: "idle",
    data: [],
  },
  listCategoryItem: {
    status: "idle",
    data: [],
  },
  postDataStock: {
    status: "idle",
    data: {},
  },
};

export const getListAllStock: any = createAsyncThunk(
  "stock/getListAllStock",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/master/item/index");

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getListAllCategory: any = createAsyncThunk(
  "stock/getListAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/master/item_type/index");

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const postNewStockData: any = createAsyncThunk(
  "stock/postNewStockData",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/master/item/save", data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListAllStock.pending, (state) => {
        state.listAllStock.status = "pending";
      })
      .addCase(
        getListAllStock.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.listAllStock.status = "success";
          state.listAllStock.data = action.payload;
        }
      )
      .addCase(getListAllStock.rejected, (state: any) => {
        state.listAllStock.status = "error";
      })
      .addCase(getListAllCategory.pending, (state) => {
        state.listCategoryItem.status = "pending";
      })
      .addCase(
        getListAllCategory.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.listCategoryItem.status = "success";
          const newData = action.payload.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
          state.listCategoryItem.data = newData;
        }
      )
      .addCase(getListAllCategory.rejected, (state: any) => {
        state.listCategoryItem.status = "error";
      })
      .addCase(postNewStockData.pending, (state) => {
        state.postDataStock.status = "pending";
       
      })
      .addCase(postNewStockData.fulfilled, (state: any, action:PayloadAction<any>) => {
        state.postDataStock.status = "success";
        const newData = {
            ...action.payload,
            item_type:{
                name: state.listCategoryItem.data.find((item: any) => item.value == action.payload.item_type_id)?.label
            }

        }
        state.listAllStock.data.push(newData);
        
      })
      .addCase(postNewStockData.rejected, (state: any) => {
        state.postDataStock.status = "error";
      });
  },
});

export default stockSlice.reducer;
