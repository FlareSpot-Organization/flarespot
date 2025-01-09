import axiosClient from "@/services/api/axiosClient";
import {
  IForgotPassword,
  ILogin,
  IRegister,
  IVerify,
  IResetPassword,
} from "@/types/auth_types";

const login_user = async (userData: ILogin) => {
  const response = await axiosClient.post(`/auth/login`, userData);

  if (response.data.success === true) {
    localStorage.setItem("BST_access_Token", response.data.data.accessToken);
    localStorage.setItem("BST_refresh_Token", response.data.data.refreshToken);
  }
  return response.data;
};

const register_user = async (userData: IRegister) => {
  const response = await axiosClient.post(`/auth/register`, userData);

  if (response.data.success === true) {
    localStorage.setItem("BST_reg_data", JSON.stringify(response.data.data));
  }
  return response.data;
};

const verify_user = async (userData: IVerify) => {
  const response = await axiosClient.post(`/auth/verify/${userData._id}`, {
    authCode: userData.authCode,
  });

  if (response.data.success === true) {
    localStorage.setItem("BST_reg_data", JSON.stringify(response.data.data));
  }
  return response.data;
};

const forgot_password = async (userData: IForgotPassword) => {
  const response = await axiosClient.post(`/auth/forgot-password`, {
    email: userData.email,
  });

  return response.data;
};

const reset_password = async (userData: IResetPassword) => {
  const response = await axiosClient.post(`/auth/reset-password`, userData);

  return response.data;
};
const logout_user = async () => {
  const refreshToken = localStorage.getItem("BST_refresh_Token");
  if (!refreshToken) {
    return;
  }

  const response = await axiosClient.post("/auth/logout", {
    refreshToken: refreshToken,
  });

  if (response.data.success === true) {
    localStorage.removeItem("BST_access_Token");
    localStorage.removeItem("BST_refresh_Token");
    localStorage.removeItem("BST_user_details");
  }

  return response.data;
};

//SignIn Options With google, facebook and github

const login_user_google = async (code: { code: string }) => {
  const response = await axiosClient.get(
    `/auth/google/callback?code=${code.code}`
  );

  if (response.data.success === true) {
    localStorage.setItem("BST_access_Token", response.data.data.accessToken);
    localStorage.setItem("BST_refresh_Token", response.data.data.refreshToken);
  }
  return response.data;
};

const login_user_facebook = async (code: { code: string }) => {
  const response = await axiosClient.get(
    `/auth/facebook/callback?code=${code.code}`
  );

  if (response.data.success === true) {
    localStorage.setItem("BST_access_Token", response.data.data.accessToken);
    localStorage.setItem("BST_refresh_Token", response.data.data.refreshToken);
  }
  return response.data;
};

const login_user_github = async (code: { code: string }) => {
  const response = await axiosClient.get(
    `/auth/github/callback?code=${code.code}`
  );

  if (response.data.success === true) {
    localStorage.setItem("BST_access_Token", response.data.data.accessToken);
    localStorage.setItem("BST_refresh_Token", response.data.data.refreshToken);
  }
  return response.data;
};

const authService = {
  login_user,
  login_user_google,
  login_user_facebook,
  login_user_github,
  logout_user,
  register_user,
  verify_user,
  reset_password,
  forgot_password,
};

export default authService;
