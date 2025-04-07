import classNames from "classnames/bind";
import styles from "./SignUp.module.scss";
import images from "../../assets/images";
import Input from "../../components/InputItem";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
// import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createApi } from "../../services/authApi";

const cx = classNames.bind(styles);

function SignUp() {
  const navigate = useNavigate();

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
      toast.error("Passwords do not match", {
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
      toast.error("All fields are required", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    try {
      const result = await createApi(
        form.fullname,
        form.email,
        form.password
      );

      navigate("/");
      toast.success(result.EM, {
        duration: 2000,
        position: "top-right",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error;
      toast.error(errorMessage, {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("webDescription")}>
        <img src={images.logo} alt="Logo" className={cx("logo")} />
        <span className={cx("slogan")}>THIS IS MY FIRST FULLSTACK PROJECT</span>
      </div>
      <form onSubmit={handleSignUp} className={cx("formWrapper")}>
        <div className={cx("infoWrapper")}>
          <h2 className={cx("title")}>Sign up</h2>
          <Input
            icon="bi bi-info-circle-fill"
            type="text"
            name="fullname"
            placeholder="Full name"
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
            placeholder="Password"
            onChange={onUpdateField}
          />
          <Input
            type="password"
            name="verifyPassword"
            placeholder="Verify password"
            onChange={onUpdateField}
          />
          <div className={cx("actions")}>
            <span className={cx("terms")}>
              By signing up, you agree to our terms and conditions
            </span>
            <Button type="submit" primary className={cx("signUpBtn")}>
              Sign up
            </Button>
            <Link to="/">
              <span className={cx("alreadyHaveAccount")}>
                Already Have an account?
              </span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
