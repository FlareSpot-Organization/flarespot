import { ILogin } from "@/types/auth_types";
import axios from "axios";

const login_user = async (userData: ILogin) => {
  const response = await axios.post(
    `https://fakestoreapi.com/auth/login`,
    userData
  );

  if (response.data) {
    localStorage.setItem("flareSpotToken", response.data.token);
  }

  return response.data;
};

const get_user = async () => {
  const response = await axios.get(`https://fakestoreapi.com/users/1`);

  if (response.data) {
    localStorage.setItem("flareSpotUser", response.data);
  }
  return response.data;
};

const logout_user = async () => {
  localStorage.removeItem("flareSpotToken");
  localStorage.removeItem("flareSpotUser");
};

const authService = {
  login_user,
  get_user,
  logout_user,
};

export default authService;
