import axiosInstance from "./axiosInstance";

const createOrGetConversation = async (friendId) => {
  try {
    const result = await axiosInstance.post("conversation", {
      memberIds: [friendId],
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUserConversations = async () => {
  try {
    const result = await axiosInstance.get("conversation");
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getConversationWith = async (friendId) => {
  try {
    const result = await axiosInstance.get(`conversation/${friendId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

export { createOrGetConversation, getUserConversations, getConversationWith };
