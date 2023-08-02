import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import "./style.scss";
import axiosClient from "../../../api/\baxiosClient";
import { toastify } from "../../../utils/common";
import Loading from "../../../components/loading/loading";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const validationInput = yup.object().shape({
  identifier: yup.string().required("Vui lòng nhập email hoặc tên đăng nhập."),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự !!!")
    .max(30, "Mật khẩu tối đa 30 ký tự !!!")
    .required("Mật khẩu không được để trống"),
});

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(validationInput), // Explicitly provide the Resolver type
  });

  // function onPress_ENTER(event: React.KeyboardEvent<HTMLInputElement>) {
  //   var keyPressed = event.keyCode || event.which;
  //   if (keyPressed === 13) {
  //     const { email, password } = watch();
  //     handleLogin({ email, password, userName: "" }); // Add an empty userName property or modify handleLogin accordingly
  //     // keyPressed = null;
  //   } else {
  //     return false;
  //   }
  // }

  const handleLogin = (data) => {
    const { identifier, password } = data;

    // Check if the input is in the email format
    const isEmailFormat = /\S+@\S+\.\S+/.test(identifier);

    // Prepare the data for API call
    const loginData = isEmailFormat
      ? { email: identifier, password }
      : { userName: identifier, password };

    setLoadingPage(true);
    axios
      .post("http://localhost:4000/api/user/login", loginData)
      .then((res) => {
        console.log(res);
        toastify("success", res.data.message || " Đăng nhập thành công !");
        reset();
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        toastify("error", err.response?.data?.message || "Lỗi hệ thống !");
        setLoadingPage(false);
      });
  };

  return (
    <div>
      <div className="container_Login">
        <div className={`container_Login_form `}>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "28px",
              color: "#636e72",
            }}
          >
            Chào mừng bạn trở lại
          </p>
          <div className="container_Login_form_text">
            <TextField
              error={!!errors?.identifier}
              {...register("identifier")}
              type="text"
              label="Email hoặc tên đăng nhập của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%" }}
              helperText={errors.identifier?.message}
            />
            <TextField
              error={!!errors?.password}
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Mật khẩu của bạn"
              size="small"
              sx={{ width: "80%", marginLeft: "10%", marginTop: "20px" }}
              helperText={errors.password?.message}
              // onKeyDown={(e) => onPress_ENTER(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="back_home">
            <span
              onClick={() => {
                navigation("/forgot-password");
              }}
            >
              Quên mật khẩu
            </span>
          </div>
          <LoadingButton
            className="buttonlogin"
            onClick={handleSubmit(handleLogin)}
            // loading={check}
            variant="outlined"
            disabled={!isDirty && !isValid}
          >
            Đăng nhập
          </LoadingButton>
          <p className="text">
            Nếu bạn chưa có tài khoản ?{" "}
            <span
              onClick={() => {
                navigation("/register");
              }}
            >
              Đăng Ký
            </span>
          </p>
        </div>
      </div>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default LoginForm;
