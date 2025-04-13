import classNames from "classnames/bind";
import Header from "../Components/Header";
import styles from "./ProfileLayout.module.scss";
import { useAuth } from "../../contexts/authContext";
import { useState, useEffect } from "react";
import images from "../../assets/images";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  getUserInfo,
  sendFriendRequest,
  cancelFriendRequest,
  unfriend,
  acceptFriendRequest,
  denyFriendRequest,
} from "../../services/userApi";
import toast from "react-hot-toast";
import Button from "../../components/Button";

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
  const { user } = useAuth();
  const { userId: paramUserId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [hasSentReq, setHasSentReq] = useState(false);
  const [hasReceivedReq, setHasReceivedReq] = useState(false);
  const isCurrentUserProfile = paramUserId === user?._id;
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(paramUserId);
        setUserProfile(userInfo.result);
      } catch (error) {
        toast.error(error.message || "Lỗi khi tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [paramUserId]);

  useEffect(() => {
    if (!userProfile) return;
    setIsFriend(userProfile.friends.includes(user?._id));
    setHasSentReq(userProfile.friendRequests?.received.includes(user?._id));
    setHasReceivedReq(userProfile.friendRequests?.sent.includes(user?._id));
  }, [userProfile, user?._id]);

  const handleEditAvatar = () => {
    if (isCurrentUserProfile) {
      toast("Chức năng sửa avatar đang được phát triển.");
    } else {
      toast.error("Bạn không thể sửa avatar của người khác.");
    }
  };

  const handleEditCover = () => {
    if (isCurrentUserProfile) {
      toast("Chức năng sửa ảnh bìa đang được phát triển.");
    } else {
      toast.error("Bạn không thể sửa ảnh bìa của người khác.");
    }
  };

  const handleFriendAction = async (actionType) => {
    try {
      let result;
      switch (actionType) {
        case "send":
          result = await sendFriendRequest(paramUserId);
          if (result.EC === 0) {
            setHasSentReq(true);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
            setTimeout(() => window.location.reload(), 1000);
          }
          break;

        case "cancel":
          result = await cancelFriendRequest(paramUserId);
          if (result.EC === 0) {
            setHasSentReq(false);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
            setTimeout(() => window.location.reload(), 1000);
          }
          break;

        case "unfriend":
          result = await unfriend(paramUserId);
          if (result.EC === 0) {
            setIsFriend(false);
            setUserProfile((prev) => ({
              ...prev,
              friends: prev.friends.filter((id) => id !== user?._id),
            }));
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
            setTimeout(() => window.location.reload(), 1000);
          }
          break;

        case "accept":
          result = await acceptFriendRequest(paramUserId);
          if (result.EC === 0) {
            setIsFriend(true);
            setHasReceivedReq(false);
            setUserProfile((prev) => ({
              ...prev,
              friends: [...prev.friends, user?._id],
            }));
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
            setTimeout(() => window.location.reload(), 1000);
          }
          break;

        case "deny":
          result = await denyFriendRequest(paramUserId);
          if (result.EC === 0) {
            setHasReceivedReq(false);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
            setTimeout(() => window.location.reload(), 1000);
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

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("profileHeader")}>
        <div className={cx("coverPhotoContainer")}>
          <img
            src={userProfile?.coverPhoto || images.avatar}
            alt="Cover"
            className={cx("coverPhoto")}
          />
          <Button
            primary
            small
            className={cx("editCoverBtn")}
            onClick={isCurrentUserProfile ? handleEditCover : undefined}
          >
            {isCurrentUserProfile ? "Sửa ảnh bìa" : "Xem ảnh bìa"}
          </Button>
        </div>

        <div className={cx("profileInfoAndActions")}>
          <div className={cx("avatarWrapper")}>
            <img
              src={userProfile?.profilePicture || images.avatar}
              alt="Avatar"
              className={cx("avatar")}
              onClick={handleEditAvatar}
            />
          </div>

          <div className={cx("nameAndAction")}>
            <div className={cx("userInfo")}>
              <h1>{userProfile?.fullname}</h1>
              <span>{userProfile.friends.length} bạn bè</span>
            </div>
            {!isCurrentUserProfile && (
              <div className={cx("actionButtons")}>
                {isFriend ? (
                  <Button
                    small
                    outline
                    onClick={() => handleFriendAction("unfriend")}
                  >
                    Bạn bè (Hủy)
                  </Button>
                ) : hasReceivedReq ? (
                  <>
                    <Button
                      small
                      primary
                      onClick={() => handleFriendAction("accept")}
                    >
                      Chấp nhận
                    </Button>
                    <Button
                      small
                      outline
                      onClick={() => handleFriendAction("deny")}
                    >
                      Từ chối
                    </Button>
                  </>
                ) : hasSentReq ? (
                  <Button
                    small
                    outline
                    onClick={() => handleFriendAction("cancel")}
                  >
                    Đã gửi lời mời (Hủy)
                  </Button>
                ) : (
                  <Button
                    small
                    primary
                    onClick={() => handleFriendAction("send")}
                  >
                    Kết bạn
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={cx("actions")}>
          <Link to={`/profile/${paramUserId}`}>
            <Button
              small
              className={
                currentPath === `/profile/${paramUserId}`
                  ? "primary"
                  : "outline"
              }
            >
              Bài viết
            </Button>
          </Link>
          <Link to={`/profile/${paramUserId}/friends`}>
            <Button
              small
              className={
                currentPath === `/profile/${paramUserId}/friends`
                  ? "primary"
                  : "outline"
              }
            >
              Bạn bè
            </Button>
          </Link>
        </div>
      </div>
      <div className={cx("container")}>{children}</div>
    </div>
  );
}

export default ProfileLayout;
