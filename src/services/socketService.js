import { io } from "socket.io-client";

// Khởi tạo socket client
const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Ưu tiên websocket, tránh bị downgrade xuống polling
});

// Hàm đăng ký người dùng với server
export const registerUserSocket = (userId) => {
  socket.emit("register", userId); // Gửi userId lên server để đăng ký socket ID
};

// Hàm lắng nghe sự kiện "newFriendRequest"
export const listenNewFriendRequest = (callback) => {
  socket.on("newFriendRequest", callback);
};

// Nghe sự kiện "friendRequestAccepted"
export const listenFriendRequestAccepted = (callback) => {
  socket.on("friendRequestAccepted", callback);
};

export const listenLikePost = (callback) => {
  socket.on("like_post", callback);
};

// Nghe sự kiện "friendRequestAccepted"
export const listenCommentPost = (callback) => {
  socket.on("comment", callback);
};

export const listenNewMessage = (callback) => {
  socket.on("newMessage", callback);
};

// Xuất socket ra dùng chung nếu cần
export default socket;
