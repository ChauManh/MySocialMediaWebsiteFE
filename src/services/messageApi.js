import axiosInstance from "./axiosInstance";

const getMessageByConversationId = async (conversationId) => {
  try {
    const result = await axiosInstance.get(`message/${conversationId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const sendMessage = async (conversationId, message, receiveUserId) => {
  try {
    const result = await axiosInstance.post("message", {
      conversationId: conversationId || null,
      message,
      receiveUserId: receiveUserId || null,
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const readMessage = async (conversationId) => {
  try {
    const result = await axiosInstance.patch(`message/${conversationId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

export { getMessageByConversationId, sendMessage, readMessage };
