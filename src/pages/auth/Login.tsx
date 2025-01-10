import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLoginForm from "@/hooks/useLoginForm";
import { fashionImages } from "@/utils/Content";
import { AnimatePresence, motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";

const Login = () => {
  const { formik, currentImageIndex, isLoading } = useLoginForm();

  return (
    <div className="min-h-screen flex">
      {/* Fashion Showcase Side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
            <img
              src={fashionImages[currentImageIndex].url}
              alt={fashionImages[currentImageIndex].alt}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-20 left-10 text-white">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-2">
                {fashionImages[currentImageIndex].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl">
                {fashionImages[currentImageIndex].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Login Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your fashion account
            </CardDescription>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
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
              <div className="flex items-center justify-between text-sm">
                <Button variant="link" className="p-0 h-auto" type="button">
                  Forgot password?
                </Button>
                <Button variant="link" className="p-0 h-auto" type="button">
                  Create account
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={!formik.isValid || isLoading}>
                {isLoading ? <CgSpinner /> : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
