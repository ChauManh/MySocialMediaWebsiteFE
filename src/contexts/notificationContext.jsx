import { createContext, useContext, useState, useEffect } from "react";
import {
  listenFriendRequestAccepted,
  listenNewFriendRequest,
} from "../services/socketService";
import { getNotifications } from "../services/notificationApi";
import toast from "react-hot-toast";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Load notifications lúc mới vào app
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications();
      if (res.EC === 0) {
        setNotifications(res.result);
      }
    };
    fetchNotifications();
  }, []);

  // Nghe socket
  useEffect(() => {
    const handleNewFriendRequest = (data) => {
      setNotifications((prev) => [data, ...prev]);
      toast.success(data.message || "Bạn có lời mời kết bạn mới!", {
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

    listenNewFriendRequest(handleNewFriendRequest);
    listenFriendRequestAccepted(handleFriendRequestAccepted);
    return () => {
      //   socket.off("newFriendRequest"); // Nếu service chưa off thì mình cần tự off (mình sẽ gợi ý sau)
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook để xài cho tiện
export const useNotifications = () => {
  return useContext(NotificationContext);
};
