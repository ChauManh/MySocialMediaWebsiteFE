// components/MessageCard/index.jsx
import classNames from "classnames/bind";
import styles from "./MessageCard.module.scss";
import Avatar from "../Avatar";
import images from "../../assets/images";
import { useChat } from "../../contexts/chatContext";
import { useAuth } from "../../contexts/authContext";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function MessageCard({ conversation, onClick }) {
  const { openChatWith } = useChat();
  const { user } = useAuth();
  const lastMessage = conversation?.lastMessage;
  const isSentByMe = lastMessage?.senderId === user._id;
  const isSeen = lastMessage?.readBy?.includes(user._id);
  const isRead = isSentByMe || isSeen;

  const handleClick = () => {
    try {
      openChatWith(conversation.with, conversation._id);
      onClick();
    } catch (error) {
      toast.error(error.response.data.EM);
    }
  };

  return (
    <div
      className={cx("card", { read: isRead, unread: !isRead })}
      onClick={handleClick}
    >
      <Avatar
        image={conversation?.with?.profilePicture || images.avatar}
        small
      />
      <div className={cx("info")}>
        <div className={cx("name")}>{conversation?.with?.fullname}</div>
        <div className={cx("lastMessage")}>
          {(() => {
            const senderName =
              lastMessage?.senderId === user._id ||
              lastMessage?.senderId?._id === user._id
                ? "Bạn"
                : conversation?.with?.fullname;

            if (lastMessage?.messageType === "image") {
              return `${senderName} đã gửi một ảnh`;
            }

            return `${senderName}: ${lastMessage?.message}`;
          })()}
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
