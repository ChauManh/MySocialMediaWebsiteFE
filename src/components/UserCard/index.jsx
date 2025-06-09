import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./UserCard.module.scss";
import Avatar from "../Avatar";
import Button from "../Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../../assets/images";
import { useAuth } from "../../contexts/authContext";
import {
  sendFriendRequest,
  cancelFriendRequest,
  unfriend,
  acceptFriendRequest,
  denyFriendRequest,
} from "../../services/userApi";
import { addUserHistorySearch } from "../../services/userHistoryApi";

const cx = classNames.bind(styles);

function UserCard({ userData }) {
  const { user } = useAuth();
  const [friendCount, setFriendCount] = useState(userData?.friends?.length);
  const [isFriend, setIsFriend] = useState(
    user?.friends.includes(userData._id)
  );
  const [hasSentReq, setHasSentReq] = useState(
    user?.friendRequests.sent.includes(userData._id)
  );
  const [hasReceivedReq, setHasReceivedReq] = useState(
    user?.friendRequests.received.includes(userData._id)
  );
  const mutualFriends = userData?.friends.filter((friendId) =>
    user?.friends.includes(friendId)
  );

  const handleClickUser = async () => {
    await addUserHistorySearch("user", userData._id);
  };

  const handleFriendAction = async (actionType) => {
    try {
      let result;
      switch (actionType) {
        case "send":
          result = await sendFriendRequest(userData._id);
          if (result.EC === 0) {
            setHasSentReq(true);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        case "cancel":
          result = await cancelFriendRequest(userData._id);
          if (result.EC === 0) {
            setHasSentReq(false);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        case "unfriend":
          result = await unfriend(userData._id);
          if (result.EC === 0) {
            setIsFriend(false);
            setFriendCount((prev) => prev - 1);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        case "accept":
          result = await acceptFriendRequest(userData._id);
          if (result.EC === 0) {
            setIsFriend(true);
            setHasReceivedReq(false);
            setFriendCount((prev) => prev + 1);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        case "deny":
          result = await denyFriendRequest(userData._id);
          if (result.EC === 0) {
            setHasReceivedReq(false);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        default:
          toast.error("Hành động không hợp lệ.");
          return;
      }
    } catch (error) {
      toast.error(error.message || "Lỗi không xác định.");
    }
  };
  return (
    <div className={cx("userItem")}>
      <Link to={`/profile/${userData._id}`} onClick={handleClickUser}>
        <Avatar image={userData.profilePicture || images.avatar} />
      </Link>
      <Link to={`/profile/${userData._id}`} onClick={handleClickUser} className={cx("info")}>
          <h4>{userData.fullname}</h4>
          <p className={cx("friendCount")}>{friendCount} bạn bè</p>
          <p className={cx("mutual")}>{mutualFriends.length || 0} bạn chung</p>
      </Link>
      <div className={cx("actionButtons")}>
        {isFriend ? (
          <Button small outline onClick={() => handleFriendAction("unfriend")}>
            Bạn bè (Hủy)
          </Button>
        ) : hasReceivedReq ? (
          <>
            <Button small primary onClick={() => handleFriendAction("accept")}>
              Chấp nhận
            </Button>
            <Button
              small
              outline
              onClick={() => handleFriendAction("deny")}
              className="btn-no-margin-left"
            >
              Từ chối
            </Button>
          </>
        ) : hasSentReq ? (
          <Button small outline onClick={() => handleFriendAction("cancel")}>
            Đã gửi lời mời (Hủy)
          </Button>
        ) : (
          <Button small primary onClick={() => handleFriendAction("send")}>
            Kết bạn
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
