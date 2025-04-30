import { createContext, useContext, useState } from "react";
import { getMessageByConversationId } from "../services/messageApi";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [openChats, setOpenChats] = useState([]);

  const openChatWith = async (friend, conversationId) => {
    const alreadyOpen = openChats.some((f) => f._id === friend._id);
    if (alreadyOpen) return;

    const res = await getMessageByConversationId(conversationId);
    const messages = res.EC === 0 ? res.result : [];

    setOpenChats((prev) => [...prev, { ...friend, conversationId, messages }]);
  };

  const closeChatWith = (friendId) => {
    setOpenChats((prev) => prev.filter((f) => f._id !== friendId));
  };

  const updateChatMessages = (conversationId, message) => {
    setOpenChats((prev) =>
      prev.map((chat) => {
        if (chat.conversationId !== conversationId) return chat;

        const existed = chat.messages?.some((m) => m._id === message._id);
        if (existed) return chat;

        return {
          ...chat,
          messages: [...(chat.messages || []), message],
        };
      })
    );
  };

  return (
    <ChatContext.Provider
      value={{ openChats, openChatWith, closeChatWith, updateChatMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
