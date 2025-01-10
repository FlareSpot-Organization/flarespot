import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import { ILogin, initialAuthStateProps } from "@/types/auth_types";
import { createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const token = localStorage.getItem("flareSpotToken");
const user = localStorage.getItem("flareSpotUser");

const initialState: initialAuthStateProps = {
  token: token ? token : null,
  user: user ? user : null,
  isLoading: false,
  message: "",
  isSuccess: false,
  isError: false,
};

export const LoginUser = createAsyncThunkWithHandler(
  "auth/login",
  async (user: ILogin, _) => {
    return await authService.login_user(user);
  }
);

export const LogoutUser = createAsyncThunkWithHandler(
  "auth/logout",
  async () => {
    return await authService.logout_user();
  }
);

export const GetUser = createAsyncThunkWithHandler("auth/getUser", async () => {
  return await authService.get_user();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Login Successfully";
        state.token = action.payload.token;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(GetUser.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })

      .addCase(LogoutUser.fulfilled, (state, _) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
