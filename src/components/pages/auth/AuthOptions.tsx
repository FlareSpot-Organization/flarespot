import { Box } from "@mui/material";
import { Typography } from "antd";
import google from "@/assets/images/google.png";
import apple from "@/assets/images/apple.png";

const AuthOptions = () => {
  return (
    <div>
      {" "}
      <Box>
        <div className="mt-3">
          <Typography className="hr-lines opacity-50  text-primary font-semibold text-[12px]">
            or
          </Typography>
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex justify-center bg-gray-50 p-2 border border-gray-50 rounded-full cursor-pointer items-center space-x-1 transition-transform duration-300 ease-in-out hover:scale-105">
            <img src={google} alt="google icon" className="w-[5%]" />
            <h5 className="text-[12px]">Continue with Google</h5>
          </div>
          <div className="flex justify-center bg-gray-50 p-2 border border-gray-50 rounded-full cursor-pointer items-center space-x-1 transition-transform duration-300 ease-in-out hover:scale-105">
            <img src={apple} alt="google icon" className="w-[5%]" />
            <h5 className="text-[12px]">Continue with Apple</h5>
          </div>
        </div>
        <div className="mt-6 space-y-3 text-center text-xs text-gray-500">
          <p>
            By clicking <span className="font-medium">Sign in</span>,
            <span className="font-medium"> Continue with Google</span>, or
            <span className="font-medium"> Apple</span>, you agree to our
            <a href="#" className="text-blue-500 hover:underline">
              {" "}
              Terms of Service
            </a>{" "}
            and
            <a href="#" className="text-blue-500 hover:underline">
              {" "}
              Privacy Policy
            </a>
            .
          </p>
          <p>
            We may send you communications; you can update your preferences in
            your account settings. We’ll never post without your permission.
          </p>
        </div>
      </Box>
    </div>
  );
};

export default AuthOptions;
