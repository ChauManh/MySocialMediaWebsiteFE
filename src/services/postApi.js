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
    const result = await axiosInstance.get(`post/posts/${userId}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const getPostsToDisplay = async () => {
  try {
    const result = await axiosInstance.get("post/posts-display");
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const likePost = async (postId) => {
  try {
    const result = await axiosInstance.patch(`post/${postId}/like`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const deletePost = async (postId) => {
  try {
    const result = await axiosInstance.delete(`post/${postId}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const commentPost = async (postId, textComment) => {
  try {
    const result = await axiosInstance.patch(`post/${postId}/comment`, {
      textComment, // gửi vào body
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const getDetailPost = async (postId) => {
  try {
    const result = await axiosInstance.get(`post/${postId}`);
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  createPost,
  getPosts,
  getPostsToDisplay,
  likePost,
  deletePost,
  commentPost,
  getDetailPost,
};
