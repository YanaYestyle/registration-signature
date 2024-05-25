import { useDialog } from "@/components/dialog/dialog-provider";
import { User } from "@/types/user";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  user: User;
  error: string;
};

const initialState: InitialState = {
  user: {},
  error: "",
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (params) => {
    try {
      const res = await axios.post("/api/new-user", params);
      return res.data;
    } catch (error: any) {
      //TODO: Create Error Interceptor
      if (error.response.statusText === "User already exists") return;
    }
  }
);

const newUser = createSlice({
  name: "new-user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.user = action.payload), (state.error = "");
      }
    ),
      builder.addCase(createUser.rejected, (state, action) => {
        (state.user = {}),
          (state.error = action.error.message || "Somthing is wrong");
      });
  },
  reducers: {},
});

export default newUser.reducer;
