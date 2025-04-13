import axios from "axios";

const URL_API = `http://localhost:5000/user`;

const getAccessToken = () => localStorage.getItem("access_token");

const getOwnerUserInfo = async () => {
  try {
    const result = await axios.get(URL_API, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUserInfo = async (userId) => {
  try {
    const result = await axios.get(`${URL_API}/${userId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const updateUserAbout = async (about) => {
  try {
    const result = await axios.patch(
      URL_API,
      { dataUpdate: { about } },
      { headers: { Authorization: `Bearer ${getAccessToken()}` } }
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const sendFriendRequest = async (userId) => {
  try {
    const result = await axios.post(
      `${URL_API}/friend-request/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      }
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const cancelFriendRequest = async (userId) => {
  try {
    const result = await axios.delete(`${URL_API}/friend-request/${userId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const unfriend = async (userId) => {
  try {
    const result = await axios.delete(`${URL_API}/friend/${userId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const acceptFriendRequest = async (userId) => {
  try {
    const result = await axios.patch(
      `${URL_API}/friend-request/accept/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      }
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const denyFriendRequest = async (userId) => {
  try {
    const result = await axios.patch(
      `${URL_API}/friend-request/deny/${userId}`,
      {},
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      }
    );
    return result.data;
  } catch (error) {
    return error.response?.data;
  }
};

const getUserFriends = async (userId) => {
  try {
    const result = await axios.get(`${URL_API}/friends/${userId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
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
  acceptFriendRequest,
  denyFriendRequest,
  updateUserAbout,
  getUserFriends,
};
