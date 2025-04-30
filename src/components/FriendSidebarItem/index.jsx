import React from "react";
import classNames from "classnames/bind";
import styles from "./FriendSidebarItem.module.scss";
import Avatar from "../Avatar";
import images from "../../assets/images";
import { useChat } from "../../contexts/chatContext";
import { createOrGetConversation } from "../../services/conversationApi";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function FriendSidebarItem({ friend }) {
  const { openChatWith } = useChat();
  const handleClick = async () => {
    const res = await createOrGetConversation(friend._id);
    if (res.EC === 0) openChatWith(friend, res.result._id);
    else toast.error(res.EM);
  };
  return (
    <div className={cx("item")} onClick={() => handleClick()}>
      <Avatar image={friend.profilePicture || images.avatar} small />
      <div className={cx("info")}>
        <span className={cx("name")}>{friend.fullname}</span>
      </div>
    </div>
  );
}

export default FriendSidebarItem;
