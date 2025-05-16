import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import images from "../../assets/images";
import Input from "../../components/InputItem";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginApi } from "../../services/authApi.js";
import { useAuth } from "../../contexts/authContext.jsx";
const cx = classNames.bind(styles);

function SignIn() {
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // validate
    if (!form.email || !form.password) {
      toast.error("Yêu cầu nhập đầy đủ thông tin", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    const result = await loginApi(form.email, form.password);
    // Lưu jwt token
    if (result.EC == 0) {
      localStorage.setItem("access_token", result.result.access_token);
      localStorage.setItem("refresh_token", result.result.refresh_token);
      toast.success(result.EM, {
        duration: 1000,
        position: "top-right",
      });
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    } else {
      toast.error(result.EM, {
        duration: 2000,
        position: "top-right",
      });
      return 0;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("webDescription")}>
        <img src={images.logo} alt="Logo" className={cx("logo")} />
        <span className={cx("slogan")}>MT SOCIAL MEDIA</span>
      </div>
      <form onSubmit={handleSignIn} className={cx("formWrapper")}>
        <div className={cx("infoWrapper")}>
          <h2 className={cx("title")}>Đăng nhập</h2>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onUpdateField}
          />
          <Input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={onUpdateField}
            autocomplete="current-password"
          />
          <div className={cx("actions")}>
            <Button type="submit" primary className={cx("signInBtn")}>
              Đăng nhập
            </Button>
            {/* <Link to="/signup"> */}
            <span className={cx("forgottenPassword")}>Quên mật khẩu?</span>
            {/* </Link> */}
            <Link to="/signup">
              <Button outline className={cx("signUpBtn")}>
                Tạo tài khoản
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
