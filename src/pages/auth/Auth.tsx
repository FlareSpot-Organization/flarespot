import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { fashionImages } from "@/utils/Content";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Form Side */}
      <motion.div
        initial={false}
        animate={{
          width: isLogin ? "50%" : "50%",
          x: isLogin ? "0%" : "-100%",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-6">
        <div className="sm:w-[75%] w-full">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}>
                <LoginForm />
                <Button
                  variant="link"
                  onClick={toggleForm}
                  className="mt-4 w-full">
                  Need an account? Register
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}>
                <RegisterForm />
                <Button
                  variant="link"
                  onClick={toggleForm}
                  className="mt-4 w-full">
                  Already have an account? Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Fashion Showcase Side */}
      <motion.div
        initial={false}
        animate={{
          width: "50%",
          x: isLogin ? "0%" : "100%",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
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
      </motion.div>
    </div>
  );
};

export default Auth;
