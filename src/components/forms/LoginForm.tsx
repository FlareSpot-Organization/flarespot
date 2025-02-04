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

import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import AuthOptions from "../pages/auth/AuthOptions";

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
            <Label className="text-xs" htmlFor="username">
              Username
            </Label>
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
            <Label className="text-xs" htmlFor="password">
              Password
            </Label>
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
            <Link to="/auth/register">
              <Button
                variant="link"
                className="p-0 h-auto text-[10px]"
                type="button">
                Create account
              </Button>
            </Link>
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
      <div>
        <AuthOptions />
      </div>
    </Card>
  );
};

export default LoginForm;
