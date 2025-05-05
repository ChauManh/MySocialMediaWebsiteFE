import classNames from "classnames/bind";
import styles from "./ChatBox.module.scss";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import images from "../../assets/images";
import { sendMessage } from "../../services/messageApi";
import { useAuth } from "../../contexts/authContext";
import { useChat } from "../../contexts/chatContext";

const cx = classNames.bind(styles);

function ChatBox({ friend, onClose }) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const messages = friend.messages;
  const { updateChatMessages } = useChat();

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); // không có hiệu ứng
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const res = await sendMessage(friend.conversationId, message);
    if (res.EC === 0) {
      updateChatMessages(friend.conversationId, res.result);
      setMessage("");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Avatar image={friend?.profilePicture || images.avatar} smallSize />
        <span className={cx("name")}>{friend?.fullname}</span>
        <button className={cx("closeBtn")} onClick={onClose}>
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div className={cx("messages")}>
        {messages?.map((msg, index) => {
          const isMe =
            msg.senderId === user?._id || msg.senderId._id === user?._id;

          return (
            <div
              key={index}
              className={cx("message", {
                myMessage: isMe,
                theirMessage: !isMe,
              })}
            >
              {msg.message}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className={cx("inputSection")}>
        <input
          type="text"
          placeholder="Nhắn tin..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <Button primary onClick={handleSend} circle outline>
          <i className="bi bi-send"></i>
        </Button>
      </div>
    </div>
  );
}

export default ChatBox;
