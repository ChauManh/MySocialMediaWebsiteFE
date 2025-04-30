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

// const readNotification = async (id) => {
//   try {
//     const result = await axiosInstance.patch(`notification/${id}`);
//     return result.data;
//   } catch (error) {
//     return error.response?.data;
//   }
// };

export { createOrGetConversation };
