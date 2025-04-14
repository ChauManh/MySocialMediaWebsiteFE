import axiosInstance from "./axiosInstance";

const createPost = async (postData) => {
  try {
    const result = await axiosInstance.post("post", postData);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const getPosts = async (userId) => {
  try {
    const result = await axiosInstance.get(`post/get-posts/${userId}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export { createPost, getPosts };
