import classNames from "classnames/bind";
import styles from "./MessageBar.module.scss";
import MessageCard from "../MessageCard";
import { useChat } from "../../contexts/chatContext";
import { useEffect } from "react";
import { getUserConversations } from "../../services/conversationApi";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function MessageBar({ setShowConversations }) {
  const { conversations, setConversations } = useChat();

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getUserConversations();
      if (result.EC === 0) {
        setConversations(result.result);
      } else {
        toast.error(result.EM);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className={cx("dropdown")}>
      <div className={cx("header")}>
        <span>Tin nhắn</span>
      </div>
      <div className={cx("body")}>
        {conversations?.length > 0 ? (
          conversations?.map((conversation) => (
            <MessageCard
              key={conversation._id}
              conversation={conversation}
              onClick={() => setShowConversations(false)}
            />
          ))
        ) : (
          <div className={cx("empty")}>Không có tin nhắn</div>
        )}
      </div>
    </div>
  );
}

export default MessageBar;
