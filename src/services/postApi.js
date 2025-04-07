import axios from "axios";

const createPost = async (postData) => {
  const URL_API = "http://localhost:5000/post";
  const access_Token = localStorage.getItem("access_token");
  try {
    const result = await axios.post(URL_API, {
      headers: {
        Authorization: `Bearer ${access_Token}`, 
      },
    }, postData);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const getPosts = async (userId) => {
    const URL_API = `http://localhost:5000/post/get-posts/${userId}`;
    const access_Token = localStorage.getItem("access_token");
    try {
      const result = await axios.get(URL_API, {
        headers: {
          Authorization: `Bearer ${access_Token}`, 
        },
      });
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  };
  

export { createPost, getPosts };
