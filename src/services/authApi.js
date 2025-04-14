import axiosInstance from "./axiosInstance";

const createApi = async (fullname, email, password) => {
  const data = {
    fullname,
    email,
    password,
  };
  try {
    const result = await axiosInstance.post("auth/signup", data);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const loginApi = async (email, password) => {
  const data = {
    email,
    password,
  };
  try {
    const result = await axiosInstance.post("auth/signin", data);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const refreshToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  try {
    const res = await axiosInstance.post("auth/refresh_token", {
      refresh_token,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export { loginApi, createApi, refreshToken };
