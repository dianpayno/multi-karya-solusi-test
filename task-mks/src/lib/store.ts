import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "@/lib/features/authenticationSlice/authenticationSlice";
import userReducer from "@/lib/features/userSlice/userSlice";
import stockReducer from "@/lib/features/stockSlice/stockSlice";
import trasactionReducer from "@/lib/features/transactionSlice/transactionSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authentication: authenticationReducer,
      user: userReducer,
      stock: stockReducer,
      transaction: trasactionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
