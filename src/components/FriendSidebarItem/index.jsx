import React from "react";
import classNames from "classnames/bind";
import styles from "./FriendSidebarItem.module.scss";
import Avatar from "../Avatar";
import images from "../../assets/images";
import { useChat } from "../../contexts/chatContext";
import { getConversationWith } from "../../services/conversationApi";

const cx = classNames.bind(styles);

function FriendSidebarItem({ friend }) {
  const { openChatWith } = useChat();
  const handleClick = async () => {
    const res = await getConversationWith(friend._id);
    if (res.EC === 0) {
      openChatWith(friend, res?.result?._id);
    }
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
