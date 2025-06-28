import axiosInstance from "./axiosInstance";

const getOwnerUserInfo = async () => {
  try {
    const result = await axiosInstance.get("user");
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUserInfo = async (userId) => {
  try {
    const result = await axiosInstance.get(`user/${userId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const updateUserAbout = async (about) => {
  try {
    const result = await axiosInstance.patch("user", { dataUpdate: { about } });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const updateUserProfile = async (dataUpdate) => {
  try {
    const result = await axiosInstance.patch("user", { dataUpdate });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const sendFriendRequest = async (userId) => {
  try {
    const result = await axiosInstance.post(
      `user/friend-request/${userId}`,
      {}
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const cancelFriendRequest = async (userId) => {
  try {
    const result = await axiosInstance.delete(`user/friend-request/${userId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const unfriend = async (userId) => {
  try {
    const result = await axiosInstance.delete(`user/friend/${userId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const acceptFriendRequest = async (userId) => {
  try {
    const result = await axiosInstance.patch(
      `user/friend-request/accept/${userId}`,
      {}
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const denyFriendRequest = async (userId) => {
  try {
    const result = await axiosInstance.patch(
      `user/friend-request/deny/${userId}`,
      {}
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUserFriends = async (userId) => {
  try {
    const result = await axiosInstance.get(`user/friends/${userId}`);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const updateAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", file);
    const result = await axiosInstance.patch("user/profilePicture", formData);
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const deleteAvatar = async () => {
  try {
    const result = await axiosInstance.patch("user/delete/avatar");
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const updateBackground = async (file) => {
  try {
    const formData = new FormData();
    formData.append("backgroundPicture", file);
    const result = await axiosInstance.patch(
      "user/backgroundPicture",
      formData
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const deleteBackground = async () => {
  try {
    const result = await axiosInstance.patch("user/delete/background");
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const updateUserPrivacyShowFriend = async (isShowFriends) => {
  try {
    const result = await axiosInstance.patch("user/show-friends", {
      isShowFriends,
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

export {
  getUserInfo,
  getOwnerUserInfo,
  sendFriendRequest,
  cancelFriendRequest,
  unfriend,
  updateUserProfile,
  acceptFriendRequest,
  denyFriendRequest,
  updateUserAbout,
  getUserFriends,
  updateAvatar,
  deleteAvatar,
  updateBackground,
  deleteBackground,
  updateUserPrivacyShowFriend,
};
