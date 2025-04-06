import axios from 'axios';

const createApi = async (fullname, email, password) => {
  const URL_API = 'http://localhost:5000/auth/signup';
  const data = {
    fullname,
    email,
    password,
  };
  const result = await axios.post(URL_API, data);
  return result.data;
};

const loginApi = async (email, password) => {
  const URL_API = 'http://localhost:5000/auth/signin';
  const data = {
    email,
    password,
  };
  const result = await axios.post(URL_API, data);
  return result.data;
};

export { loginApi, createApi };
