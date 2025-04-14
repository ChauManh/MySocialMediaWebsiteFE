import React, { useEffect, useState } from "react";
import { getUserFriends } from "../../services/userApi";
import FriendCard from "../../components/FriendCard";
import styles from "./ProfileFriendList.module.scss";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const cx = classNames.bind(styles);

function ProfileFriendList() {
  const { userId } = useParams();
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const isCurrentUser = userId === user?._id;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getUserFriends(userId);
        if (res.EC === 0) {
          setFriends(res.result);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchFriends();
  }, [userId]);

  return (
    <div className={cx("wrapper")}>
      <h2>{isCurrentUser ? "Bạn bè của bạn" : "Danh sách bạn bè"}</h2>
      <div className={cx("list")}>
        {friends?.length > 0 ? (
          friends.map((friend) => (
            <FriendCard key={friend._id} data={friend} />
          ))
        ) : (
          <p>Chưa có bạn bè nào.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileFriendList;
