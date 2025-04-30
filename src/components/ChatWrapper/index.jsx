import { useChat } from "../../contexts/chatContext";
import ChatBox from "../ChatBox";
import classNames from "classnames/bind";
import styles from "./ChatWrapper.module.scss";
import socket, { listenNewMessage } from "../../services/socketService";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function ChatWrapper() {
  const { openChats, closeChatWith, openChatWith, updateChatMessages } =
    useChat();
  useEffect(() => {
    const handleNewMessage = (data) => {
      const { message, conversationId, sender } = data;

      const alreadyOpen = openChats.some((chat) => chat._id === sender._id);
      if (!alreadyOpen) {
        openChatWith(sender, conversationId);
      }

      updateChatMessages(conversationId, message);
    };

    listenNewMessage(handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [openChats]);

  return (
    <>
      {openChats.map((friend, index) => (
        <div key={friend._id} className={cx("chatBoxWrapper", `pos-${index}`)}>
          <ChatBox friend={friend} onClose={() => closeChatWith(friend._id)} />
        </div>
      ))}
    </>
  );
}

export default ChatWrapper;
