import axiosInstance from "./axiosInstance";

const searchUsersByKeyword = async (keyword) => {
  try {
    const result = await axiosInstance.get("search/users", {
      params: { keyword },
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

export { searchUsersByKeyword };
