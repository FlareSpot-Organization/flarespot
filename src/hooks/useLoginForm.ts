import { GetUser, LoginUser, reset } from "@/services/features/auth/authSlice";
import { AppDispatch } from "@/store";
import { fashionImages } from "@/utils/Content";
import { LoginSchema } from "@/utils/validation";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLoginForm = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % fashionImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(LoginUser(values));
    },
  });

  useEffect(() => {
    if (isSuccess && message == "Login Successfully") {
      navigate("/");
      dispatch(GetUser());
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isSuccess, isError, isLoading, message]);

  return { formik, currentImageIndex, isLoading };
};

export default useLoginForm;
