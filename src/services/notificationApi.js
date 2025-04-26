import axiosInstance from "./axiosInstance";

const getNotifications = async () => {
  try {
    const result = await axiosInstance.get("notification");
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const readNotification = async (id) => {
  try {
    const result = await axiosInstance.patch(`notification/${id}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

export { getNotifications, readNotification };
