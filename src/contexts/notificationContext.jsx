import { createContext, useContext, useEffect } from "react";
import socket, {
  listenFriendRequestAccepted,
  listenNewFriendRequest,
  listenLikePost,
  listenCommentPost,
} from "../services/socketService";
import toast from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Nghe socket
  useEffect(() => {
    const handleNewFriendRequest = (data) => {
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
    };

    const handleFriendRequestAccepted = (data) => {
      toast.success(
        `${data.senderName} đã chấp nhận lời mời kết bạn của bạn!`,
        {
          duration: 4000,
          position: "top-right",
        }
      );
    };

    const handleLikePost = (data) => {
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
    };

    const handleCommentPost = (data) => {
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
    };

    listenNewFriendRequest(handleNewFriendRequest);
    listenFriendRequestAccepted(handleFriendRequestAccepted);
    listenLikePost(handleLikePost);
    listenCommentPost(handleCommentPost);
    return () => {
      socket.off("newFriendRequest", handleNewFriendRequest);
      socket.off("friendRequestAccepted", handleFriendRequestAccepted);
      socket.off("like_post", handleLikePost);
      socket.off("comment", handleCommentPost);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook để xài cho tiện
export const useNotifications = () => {
  return useContext(NotificationContext);
};
