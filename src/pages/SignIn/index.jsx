import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";
import images from "../../assets/images";
import Input from "../../components/InputItem";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { loginApi } from "../../services/authApi.js";

const cx = classNames.bind(styles);

function SignIn() {
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
      toast.error("All fields are required", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    try {
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
    } catch (err) {
      const errorMessage = err.response?.data?.error;
      toast.error(errorMessage, {
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
        <span className={cx("slogan")}>THIS IS MY SOCIAL MEDIA WEBSITE</span>
      </div>
      <form onSubmit={handleSignIn} className={cx("formWrapper")}>
        <div className={cx("infoWrapper")}>
          <h2 className={cx("title")}>Sign in</h2>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onUpdateField}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onUpdateField}
            Autocomplete="current-password"
          />
          <div className={cx("actions")}>
            <Button type="submit" primary className={cx("signInBtn")}>
              Sign in
            </Button>
            {/* <Link to="/signup"> */}
            <span className={cx("forgottenPassword")}>Forgotten password?</span>
            {/* </Link> */}
            <Link to="/signup">
              <Button outline className={cx("signUpBtn")}>
                Create new account
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
