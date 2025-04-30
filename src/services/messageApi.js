import axiosInstance from "./axiosInstance";

const getMessageByConversationId = async (conversationId) => {
  try {
    const result = await axiosInstance.get(`message/${conversationId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const sendMessage = async (conversationId, message) => {
  try {
    const result = await axiosInstance.post(`message`, {
      conversationId,
      message,
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

export { getMessageByConversationId, sendMessage };
