import axiosInstance from "./axiosInstance";

const addUserHistorySearch = async (type, data) => {
  try {
    let payload;

    if (type === "user") {
      payload = {
        type: "user",
        userIdTarget: data,
      };
    } else {
      payload = {
        type: "keyword",
        keyword: data,
      };
    }

    const result = await axiosInstance.post("user-history/search", payload);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getSearchHistory = async () => {
  try {
    const result = await axiosInstance.get("user-history/search");
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const deleteOneSearchHistoryByIndex = async (index) => {
  try {
    const result = await axiosInstance.delete(`user-history/search/${index}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

export {
  addUserHistorySearch,
  getSearchHistory,
  deleteOneSearchHistoryByIndex,
};
