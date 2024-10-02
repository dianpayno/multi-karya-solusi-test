import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "@/lib/features/authenticationSlice/authenticationSlice";
import userReducer from "@/lib/features/userSlice/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authentication: authenticationReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
