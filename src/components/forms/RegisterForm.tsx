import logo from "@/assets/images/logo-dark (1).png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CgSpinner } from "react-icons/cg";

import useRegisterForm from "@/hooks/useRegisterForm";
import { Link } from "react-router-dom";
import AuthOptions from "../pages/auth/AuthOptions";

const RegisterForm = () => {
  const { formik, isLoading } = useRegisterForm();

  return (
    <Card className="w-full pb-5 px-5 shadow-xs">
      <CardHeader className="space-y-1 flex items-center flex-col justify-center">
        <Link to="/" className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-[40%] mb-3" />
        </Link>
        <hr className="h-2 w-full " />

        <CardDescription className="text-center font-bold text-[#000] text-[22px]">
          Register
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit} className="">
        <CardContent className="space-y-2 w-full p-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs" htmlFor="firstname">
                First Name
              </Label>
              <Input
                id="firstname"
                type="text"
                placeholder="Enter your first name"
                {...formik.getFieldProps("firstname")}
                className={
                  formik.touched.firstname && formik.errors.firstname
                    ? "border-red-500 text-xs"
                    : "text-xs"
                }
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <div className="text-xs text-red-500">
                  {formik.errors.firstname}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-xs" htmlFor="lastname">
                Last Name
              </Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Enter your last name"
                {...formik.getFieldProps("lastname")}
                className={
                  formik.touched.lastname && formik.errors.lastname
                    ? "border-red-500 text-xs"
                    : "text-xs"
                }
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="text-xs text-red-500">
                  {formik.errors.lastname}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs" htmlFor="username">
              Email
            </Label>
            <Input
              id="username"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("username")}
              className={
                formik.touched.username && formik.errors.username
                  ? "border-red-500 text-xs"
                  : "text-xs"
              }
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-xs text-red-500">
                {formik.errors.username}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
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
                    ? "border-red-500 text-xs"
                    : "text-xs"
                }
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-xs text-red-500">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...formik.getFieldProps("confirmPassword")}
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 text-xs"
                    : "text-xs"
                }
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-xs text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>
          <div className="flex items-center my-5 justify-between text-xs">
            <Button
              variant="link"
              className="p-0 h-auto text-[12px]"
              type="button">
              Forgot password?
            </Button>
            <Link to="/auth/login">
              <Button
                variant="link"
                className="p-0 h-auto text-[12px]"
                type="button">
                Already have an account? Login
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="mt-3 p-0">
          <Button
            type="submit"
            className="w-full"
            disabled={!formik.isValid || isLoading}>
            {isLoading ? <CgSpinner /> : "Sign Up"}
          </Button>
        </CardFooter>
      </form>
      <div>
        <AuthOptions />
      </div>
    </Card>
  );
};

export default RegisterForm;
