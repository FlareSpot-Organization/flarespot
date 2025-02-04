import LoginForm from "@/components/forms/LoginForm";

import useLoginForm from "@/hooks/useLoginForm";
import { fashionImages } from "@/utils/Content";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const { currentImageIndex } = useLoginForm();

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
        <div className="w-[70%] m-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
