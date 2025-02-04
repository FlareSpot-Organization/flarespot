import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLoginForm from "@/hooks/useLoginForm";
import { CgSpinner } from "react-icons/cg";
import logo from "@/assets/images/logo-dark (1).png";
import { Typography } from "antd";
import google from "@/assets/images/google.png";
import apple from "@/assets/images/apple.png";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { formik, isLoading } = useLoginForm();

  return (
    <Card className="w-full pb-5 px-5 shadow-xs">
      <CardHeader className="space-y-1 flex items-center flex-col justify-center">
        <Link to="/" className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-[30%] mb-3" />
        </Link>
        <hr className="h-2 w-full " />

        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit} className="">
        <CardContent className="space-y-2 w-full p-0">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="Enter your username"
              {...formik.getFieldProps("username")}
              className={
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-sm text-red-500">
                {formik.errors.username}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
              className={
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-sm text-red-500">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="flex items-center mt-2 justify-between text-sm">
            <Button
              variant="link"
              className="p-0 h-auto text-[10px]"
              type="button">
              Forgot password?
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-[10px]"
              type="button">
              Create account
            </Button>
          </div>
        </CardContent>
        <CardFooter className="mt-3 p-0">
          <Button
            type="submit"
            className="w-full"
            disabled={!formik.isValid || isLoading}>
            {isLoading ? <CgSpinner /> : "Sign In"}
          </Button>
        </CardFooter>
      </form>
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
    </Card>
  );
};

export default LoginForm;
