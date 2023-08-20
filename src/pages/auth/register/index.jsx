import React from "react";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import "./style.scss";
// import axiosClient from "../../../api/\baxiosClient";
import { toastify } from "../../../utils/common";
// import Loading from "../../../components/loading/loading";
import axios from "axios";

// interface FormValues {
//   userName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   numberPhone: string;
//   address: string;
// }

const validationInput = yup.object().shape({
  userName: yup
    .string()
    .required("Tên tài khoản không được để trống.")
    .min(5, "Tên tài khoản tối thiểu 5 ký tự.")
    .max(30, "Tên tài khoản tối đa 30 ký tự."),
  email: yup.string().required("Email không được để trống").email(),
  numberPhone: yup
    .string()
    .required("Số điện thoại không được để trống.")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),
  address: yup.string().required("Địa chỉ không được để trống."),
  password: yup.string().required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống")
    .oneOf([yup.ref("password")], "Không trùng khớp."),
});

const Register = () => {
  const [loading, setLoading] = React.useState(false);
  const [loadingPage, setLoadingPage] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      numberPhone: "",
      address: "",
    },
    resolver: yupResolver(validationInput), // Explicitly provide the Resolver type
  });

  const handleRegister = (data) => {
    setLoadingPage(true);
    axios
      .post("http://localhost:4000/api/user/register", {
        userName: data.userName,
        email: data.email,
        numberPhone: data.numberPhone,
        address: data.address,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        toastify("success", res.data.message || "Tạo tài khoản thành công !");
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
    <div className="register_container">
      <div className="register_container_box">
        <h3
          style={{
            fontSize: "20px",
            textAlign: "center",
            color: "#636e72",
            textTransform: "capitalize",
          }}
        >
          Chào mừng bạn gia nhập với chúng tôi
        </h3>
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexDirection: "column",
            paddingBottom: "20px",
          }}
        >
          <TextField
            error={!!errors?.userName}
            {...register("userName")}
            type="text"
            label="Tên đăng nhập của bạn"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.userName?.message}
          />
          <TextField
            error={!!errors?.email}
            {...register("email")}
            type="text"
            label="Email của bạn"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.email?.message}
          />
          <TextField
            error={!!errors?.numberPhone}
            {...register("numberPhone")}
            type="text"
            label="Số điện thoại của bạn"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.numberPhone?.message}
          />
          <TextField
            error={!!errors?.address}
            {...register("address")}
            type="text"
            label="Địa chỉ của bạn"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.address?.message}
          />
          <TextField
            error={!!errors?.password}
            {...register("password")}
            type="password"
            label="Nhập mật khẩu"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.password?.message}
          />
          <TextField
            error={!!errors?.confirmPassword}
            {...register("confirmPassword")}
            type="password"
            label="Xác nhận mật khẩu"
            size="small"
            sx={{ width: "80%", marginLeft: "10%" }}
            helperText={errors.confirmPassword?.message}
          />
        </div>

        <div
          style={{
            width: "80%",
            display: "flex",
            marginTop: "10px",
            marginLeft: "10%",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              // navigation("/");
            }}
            // onClick={handleRegister()}
          >
            Quay lại
          </Button>
          <LoadingButton
            loading={loading}
            loadingIndicator="Loading…"
            variant="outlined"
            onClick={handleSubmit(handleRegister)}
          >
            Đăng ký
          </LoadingButton>
        </div>

        {/* <Loading loading={loadingPage} /> */}
      </div>
    </div>
  );
};

export default Register;
