//Login Type

export type ILogin = {
  email: string;
  password: string;
};

//Register Type

export type IRegister = {
  email: string;
  password: string;
  confirmPassword: string;
  fullname: string;
};

//Verify

export type IVerify = {
  authCode: number;
  _id: string;
};

//forgot password

export type IForgotPassword = {
  email: string;
};

//rest password
export type IResetPassword = {
  password: string;
  confirmPassword: string;
  token: string;
};

// authType
export type initialAuthStateProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  token: string | null;
};
