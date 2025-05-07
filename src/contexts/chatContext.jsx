import { createContext, useContext, useState } from "react";
import {
  getMessageByConversationId,
  readMessage,
} from "../services/messageApi";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [openChats, setOpenChats] = useState([]);
  const [conversations, setConversations] = useState([]);

  const openChatWith = async (friend, conversationId) => {
    const alreadyOpen = openChats.some((f) => f._id === friend._id);
    if (alreadyOpen) return;
    let messages = [];
    if (conversationId) {
      const res = await getMessageByConversationId(conversationId);
      if (res.EC == 0) {
        messages = res.result;
        await readMessage(conversationId);
      }
    }
    setOpenChats((prev) => [
      ...(prev.length > 1 ? prev.slice(1) : prev),
      { ...friend, conversationId, messages },
    ]);
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

  const updateConversationsLastMessage = (conversationId, newMessage) => {
    console.log(conversations);
    setConversations((prev) =>
      prev.map((c) =>
        c._id === conversationId
          ? { ...c, lastMessage: newMessage, updatedAt: new Date() }
          : c
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        openChats,
        openChatWith,
        closeChatWith,
        updateChatMessages,
        conversations,
        setConversations,
        updateConversationsLastMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
