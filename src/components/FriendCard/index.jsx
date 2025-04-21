import React from "react";
import styles from "./FriendCard.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import Avatar from "../Avatar";
import { useAuth } from "../../contexts/authContext";

const cx = classNames.bind(styles);

function FriendCard({ userData }) {
  const { user } = useAuth();
  const mutualFriends = user?.friends.filter(
    (id) => id !== userData._id && userData.friends.includes(id)
  );

  return (
    <div className={cx("card")}>
      <Link to={`/profile/${userData._id}`}>
        <Avatar image={userData.profilePicture || images.avatar} />
      </Link>
      <div className={cx("info")}>
        <Link to={`/profile/${userData._id}`}>
          <h4>{userData.fullname}</h4>
        </Link>
        <span>{mutualFriends.length || 0} bạn chung</span>
      </div>
      <div className={cx("actions")}></div>
    </div>
  );
}

export default FriendCard;
