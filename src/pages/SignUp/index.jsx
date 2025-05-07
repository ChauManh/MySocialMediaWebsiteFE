import classNames from "classnames/bind";
import styles from "./SignUp.module.scss";
import images from "../../assets/images";
import Input from "../../components/InputItem";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
// import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { createApi } from "../../services/authApi";
import { useAuth } from "../../contexts/authContext";

const cx = classNames.bind(styles);

function SignUp() {
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // validate
    if (form.password !== form.verifyPassword) {
      toast.error("Mật khẩu không khớp", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    // validate input fields
    if (
      !form.fullname ||
      !form.email ||
      !form.password ||
      !form.verifyPassword
    ) {
      toast.error("Yêu cầu nhập đầy đủ thông tin", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    const result = await createApi(form.fullname, form.email, form.password);
    if (result.EC === 0) {
      navigate("/");
      toast.success(result.EM, {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.error(result.EM, {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("webDescription")}>
        <img src={images.logo} alt="Logo" className={cx("logo")} />
        <span className={cx("slogan")}>ZingMe</span>
      </div>
      <form onSubmit={handleSignUp} className={cx("formWrapper")}>
        <div className={cx("infoWrapper")}>
          <h2 className={cx("title")}>Đăng ký</h2>
          <Input
            icon="bi bi-info-circle-fill"
            type="text"
            name="fullname"
            placeholder="Họ và tên"
            onChange={onUpdateField}
          />
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
          />
          <Input
            type="password"
            name="verifyPassword"
            placeholder="Xác nhận mật khẩu"
            onChange={onUpdateField}
          />
          <div className={cx("actions")}>
            <span className={cx("terms")}>
              Đồng ý và chấp nhận các điều khoản của ZingMe
            </span>
            <Button type="submit" primary className={cx("signUpBtn")}>
              Đăng ký
            </Button>
            <Link to="/">
              <span className={cx("alreadyHaveAccount")}>
                Đã có tài khoản? Đăng nhập ngay
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
