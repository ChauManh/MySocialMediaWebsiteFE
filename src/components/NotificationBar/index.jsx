// src/components/NotificationBar/index.jsx
import React, { useEffect, useState } from "react";
import NotificationCard from "../NotificationCard";
import classNames from "classnames/bind";
import styles from "./NotificationBar.module.scss"; // Tạo file SCSS riêng cho bar
import { getNotifications } from "../../services/notificationApi";

const cx = classNames.bind(styles);

const NotificationBar = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications();
      if (res.EC === 0) {
        setNotifications(res.result);
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  return (
    <div className={cx("notification-bar")}>
      <div className={cx("notification-header")}>Thông báo</div>
      {loading ? (
        <div>Đang tải thông báo...</div>
      ) : notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <NotificationCard key={index} notification={notif} />
        ))
      ) : (
        <div className={cx("no-notifications")}>Chưa có thông báo nào</div>
      )}
    </div>
  );
};

export default NotificationBar;
