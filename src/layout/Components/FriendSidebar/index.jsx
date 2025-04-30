import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FriendSidebar.module.scss";
import { getUserFriends } from "../../../services/userApi";
import { useAuth } from "../../../contexts/authContext";
import FriendSidebarItem from "../../../components/FriendSidebarItem";

const cx = classNames.bind(styles);

function FriendSidebar() {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await getUserFriends(user._id);
      if (res.EC === 0) {
        setFriends(res.result);
      }
    };

    if (user?._id) {
      fetchFriends();
    }
  }, [user]);

  return (
    <aside className={cx("sidebar")}>
      <h3 className={cx("title")}>Bạn bè</h3>
      <div className={cx("list")}>
        {friends.length > 0 ? (
          friends.map((friend) => (
            <FriendSidebarItem key={friend._id} friend={friend} />
          ))
        ) : (
          <p className={cx("empty")}>Không có bạn bè.</p>
        )}
      </div>
    </aside>
  );
}

export default FriendSidebar;
