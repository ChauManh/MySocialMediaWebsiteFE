import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./NotificationCard.module.scss";
import Avatar from "../Avatar";
import formatDate from "../../utils/formatDate";
import { readNotification } from "../../services/notificationApi";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const NotificationCard = ({ notification }) => {
  const [isRead, setIsRead] = useState(notification.isRead);
  const navigate = useNavigate();
  const handleMarkAsRead = async () => {
    const res = await readNotification(notification._id);
    if (res.EC === 0) {
      setIsRead(true);
      navigate(`/profile/${notification.senderId._id}`);
    }
  };

  return (
    <div
      className={cx("notification-card", { read: isRead, unread: !isRead })}
      onClick={handleMarkAsRead}
    >
      <div className={cx("avatar")}>
        <Avatar image={notification.senderId.profilePicture || images.avatar} />
      </div>
      <div className={cx("content")}>
        <div className={cx("message")}>{notification.message}</div>
        <div className={cx("time")}>{formatDate(notification.createdAt)}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
