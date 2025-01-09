import { createAsyncThunkWithHandler } from "@/services/api/apiHandler";
import authService from "./authService";
import { createSlice } from "@reduxjs/toolkit";
import {
  ILogin,
  initialAuthStateProps,
  IRegister,
  IVerify,
  IForgotPassword,
  IResetPassword,
} from "@/types/auth_types";

const token = localStorage.getItem("BST_access_Token");

const initialState: initialAuthStateProps = {
  token: token ? token : null,
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

export const LoginWithGoogle = createAsyncThunkWithHandler(
  "auth/login-google",
  async (code: { code: string }, _) => {
    return await authService.login_user_google(code);
  }
);

export const LoginWithFacebook = createAsyncThunkWithHandler(
  "auth/login-facebook",
  async (code: { code: string }) => {
    return await authService.login_user_facebook(code);
  }
);

export const LoginWithGithub = createAsyncThunkWithHandler(
  "auth/login-github",
  async (code: { code: string }) => {
    return await authService.login_user_github(code);
  }
);

export const RegisterUser = createAsyncThunkWithHandler(
  "auth/register",
  async (user: IRegister, _) => {
    return await authService.register_user(user);
  }
);

export const VerifyUser = createAsyncThunkWithHandler(
  "auth/verify",
  async (user: IVerify, _) => {
    return await authService.verify_user(user);
  }
);

export const ForgotPassword = createAsyncThunkWithHandler(
  "auth/forgot-password",
  async (user: IForgotPassword, _) => {
    return await authService.forgot_password(user);
  }
);

export const ResetPassword = createAsyncThunkWithHandler(
  "auth/reset-password",
  async (user: IResetPassword, _) => {
    return await authService.reset_password(user);
  }
);

export const LogoutUser = createAsyncThunkWithHandler(
  "auth/logout",
  async () => {
    return await authService.logout_user();
  }
);

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
        state.token = action.payload.data.accessToken;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;

        state.isSuccess = false;
      })
      .addCase(LoginWithGoogle.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(LoginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Login Successfully";
        state.token = action.payload.data.accessToken;
      })
      .addCase(LoginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(LoginWithFacebook.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(LoginWithFacebook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Login Successfully";
        state.token = action.payload.data.accessToken;
      })
      .addCase(LoginWithFacebook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(LoginWithGithub.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(LoginWithGithub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Login Successfully";
        state.token = action.payload.data.accessToken;
      })
      .addCase(LoginWithGithub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;

        state.isSuccess = false;
      })

      .addCase(RegisterUser.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;

        state.isSuccess = false;
      })

      .addCase(LogoutUser.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled, (state, _) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Logout successfully";
        state.token = null;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;

        state.isSuccess = false;
      })

      .addCase(VerifyUser.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(VerifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(VerifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;

        state.isSuccess = false;
      })
      .addCase(ForgotPassword.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;

        state.isSuccess = false;
      })
      .addCase(ResetPassword.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;

        state.isSuccess = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
