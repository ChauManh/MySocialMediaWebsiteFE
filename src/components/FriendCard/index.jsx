import React from "react";
import styles from "./FriendCard.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import images from "../../assets/images";
import Avatar from "../Avatar";

const cx = classNames.bind(styles);

function FriendCard({ data }) {
  return (
    <div className={cx("card")}>
      <Link to={`/profile/${data._id}`}>
        <Avatar image={data.profilePicture || images.avatar} />
      </Link>
      <div className={cx("info")}>
        <Link to={`/profile/${data._id}`}>
          <h4>{data.fullname}</h4>
        </Link>
        <span>{data.mutualFriends || 0} bạn chung</span>
      </div>
      <div className={cx("actions")}>
        {/* <Link to={`/profile/${data._id}`}>
          <Button small primary>
            Xem trang cá nhân
          </Button>
        </Link> */}
        {/* Bạn có thể thêm nút Hủy kết bạn, Nhắn tin,... */}
      </div>
    </div>
  );
}

export default FriendCard;
