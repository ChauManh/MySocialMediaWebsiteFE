import React, { useEffect, useState } from "react";
import {
  getUserFriends,
  updateUserPrivacyShowFriend,
} from "../../services/userApi";
import FriendCard from "../../components/FriendCard";
import styles from "./ProfileFriendList.module.scss";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const cx = classNames.bind(styles);

function ProfileFriendList() {
  const { userId } = useParams();
  const { user, setUser } = useAuth();
  const [friends, setFriends] = useState([]);
  const isCurrentUser = userId === user?._id;
  const [isShowFriends, setIsShowFriends] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await getUserFriends(userId);
      if (res.EC === 0) {
        if (res.result == null) setIsShowFriends(false);
        else {
          let friendsList = res.result;
          if (!isCurrentUser) {
            friendsList = friendsList.filter((f) => f._id !== user?._id);
          }
          setFriends(friendsList);
        }
      }
    };
    fetchFriends();
  }, [userId]);

  const handleChangeStatusShowFriendList = async () => {
    const newValue = !user.isShowFriends;
    const res = await updateUserPrivacyShowFriend(newValue);
    if (res.EC === 0) {
      setUser((prev) => ({ ...prev, isShowFriends: newValue }));
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h2>{isCurrentUser ? "Bạn bè của bạn" : "Danh sách bạn chung"}</h2>
        {isCurrentUser && (
          <button
            className={cx("toggle-btn")}
            onClick={handleChangeStatusShowFriendList}
          >
            {user.isShowFriends
              ? "🔓 Hiển thị danh sách bạn bè cho người khác"
              : "🔒 Không hiển thị danh sách bạn bè"}
          </button>
        )}
      </div>
      <div className={cx("list")}>
        {!isCurrentUser && !isShowFriends ? (
          <p>Người này đã ẩn danh sách bạn bè.</p>
        ) : friends?.length > 0 ? (
          friends.map((friend) => (
            <FriendCard key={friend._id} userData={friend} />
          ))
        ) : (
          <p>Chưa có bạn bè nào.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileFriendList;
