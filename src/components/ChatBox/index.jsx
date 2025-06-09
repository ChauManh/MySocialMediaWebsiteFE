import classNames from "classnames/bind";
import styles from "./ChatBox.module.scss";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import images from "../../assets/images";
import { sendMessage, sendMessageImage } from "../../services/messageApi";
import { useAuth } from "../../contexts/authContext";
import { useChat } from "../../contexts/chatContext";
import ImageModal from "../ImageModal";
import { useLoading } from "../../contexts/loadingContext";

const cx = classNames.bind(styles);

function ChatBox({ friend, onClose }) {
  const { user } = useAuth();
  const { setIsLoading } = useLoading();
  const [message, setMessage] = useState("");
  const messages = friend.messages;
  const { updateChatMessages, updateConversationsLastMessage } = useChat();
  const [modalIndex, setModalIndex] = useState(null);

  // Lọc danh sách chỉ chứa tin nhắn ảnh
  const imageMessages = messages
    .map((msg, i) => ({ ...msg, originalIndex: i }))
    .filter((msg) => msg.messageType === "image");

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" }); // không có hiệu ứng
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const res = await sendMessage(friend.conversationId, message, friend._id);
    if (res.EC === 0) {
      updateChatMessages(friend.conversationId, res.result);
      updateConversationsLastMessage(friend.conversationId, res.result);
      setMessage("");
    }
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("conversationId", friend.conversationId);
    formData.append("receiveUserId", friend._id);
    setIsLoading(true);
    const res = await sendMessageImage(formData);
    if (res.EC === 0) {
      updateChatMessages(friend.conversationId, res.result);
      updateConversationsLastMessage(friend.conversationId, res.result);
      setIsLoading(false);
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
        {messages.map((msg, index) => {
          const isMe =
            msg.senderId === user?._id || msg.senderId._id === user?._id;

          if (msg.messageType === "image") {
            // Tìm index của ảnh trong mảng imageMessages
            const imageIndex = imageMessages.findIndex(
              (imgMsg) => imgMsg._id === msg._id
            );

            return (
              <div
                key={index}
                className={cx("message", {
                  imageMessage: msg.messageType === "image",
                  myMessage: isMe,
                  theirMessage: !isMe,
                })}
              >
                <img
                  src={msg.fileUrl}
                  alt="chat-img"
                  className={cx("chatImage")}
                  onClick={() => setModalIndex(imageIndex)}
                />
              </div>
            );
          }

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
        {/* Nút gửi ảnh */}
        <label
          htmlFor={`file-upload-${friend._id}`}
          className={cx("uploadBtn")}
        >
          <i className="bi bi-image"></i>
        </label>
        <input
          type="file"
          accept="image/*"
          id={`file-upload-${friend._id}`} // tránh trùng id nếu nhiều box
          style={{ display: "none" }}
          onChange={handleSendImage}
        />
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
      {modalIndex !== null && (
        <ImageModal
          mediaList={imageMessages.map((msg) => ({
            url: msg.fileUrl,
            type: msg.messageType,
          }))}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onChangeIndex={setModalIndex}
        />
      )}
    </div>
  );
}

export default ChatBox;
