import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/login/get-user";
import createUserReducer from "@/app/login/new-user";

const store = configureStore({
  reducer: {
    user: userReducer,
    newUser: createUserReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
