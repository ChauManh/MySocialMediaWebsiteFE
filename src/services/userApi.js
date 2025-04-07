import axios from "axios";

const getUserInfo = async (userId) => {
  const URL_API = `http://localhost:5000/user/${userId}`;
  const access_Token = localStorage.getItem("access_token");

  try {
    const result = await axios.get(URL_API, {
      headers: {
        Authorization: `Bearer ${access_Token}`,
      },
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};


export { getUserInfo };
