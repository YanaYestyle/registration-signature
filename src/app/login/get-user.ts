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

export const fetchUser = createAsyncThunk("user/fetchUser", async (params) => {
  try {
    const res = await axios.get("/api/auth", { params });
    return res.data;
  } catch (error) {
    //TODO: Create Error Interceptor
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.user = action.payload), (state.error = "");
      }
    ),
    builder.addCase(fetchUser.rejected, (state, action) => {
      (state.user = {}),
        (state.error = action.error.message || "Somthing is wrong");
    });
  },
  reducers: {},
});

export default userSlice.reducer;
