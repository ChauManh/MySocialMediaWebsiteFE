import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import React, { useEffect, useState } from "react";
import images from "../../assets/images";
import {
  getUserInfo,
  sendFriendRequest,
  cancelFriendRequest,
  unfriend,
  acceptFriendRequest,
  denyFriendRequest,
} from "../../services/userApi";
import PostItem from "../../components/PostItem";
import Button from "../../components/Button";
import { getPosts } from "../../services/postApi";
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import Statusbar from "../../components/Statusbar";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function Profile() {
  const { user } = useAuth();
  const { userId: paramUserId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [hasSentReq, setHasSentReq] = useState(false);
  const [hasReceivedReq, setHasReceivedReq] = useState(false);
  const isCurrentUserProfile = paramUserId === user.userId;

  useEffect(() => {
    const fetchAllProfile = async () => {
      try {
        const userInfo = await getUserInfo(paramUserId);
        const userPost = await getPosts(paramUserId);
        setUserProfile(userInfo.result);
        setUserPosts(userPost.result);
      } catch (error) {
        toast.error(error.message || "Lỗi khi tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProfile();
  }, [paramUserId]);

  useEffect(() => {
    if (!userProfile) return;
    setIsFriend(userProfile.friends.includes(user.userId));
    setHasSentReq(userProfile.friendRequests?.received.includes(user.userId));
    setHasReceivedReq(userProfile.friendRequests?.sent.includes(user.userId));
  }, [userProfile, user.userId]);

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

  const handleEditBio = () => {
    if (isCurrentUserProfile) {
      toast("Chức năng sửa tiểu sử đang được phát triển.");
    } else {
      toast.error("Bạn không thể sửa tiểu sử của người khác.");
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
              friends: prev.friends.filter((id) => id !== user.userId),
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
              friends: [...prev.friends, user.userId],
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
    <div className={cx("profileContainer")}>
      <div className={cx("coverPhotoContainer")}>
        <img
          src={userProfile?.coverPhoto || images.avatar}
          alt="Cover"
          className={cx("coverPhoto")}
        />
        {isCurrentUserProfile ? (
          <Button
            primary
            small
            className={cx("editCoverBtn")}
            onClick={handleEditCover}
          >
            Sửa ảnh bìa
          </Button>
        ) : (
          <Button primary small className={cx("editCoverBtn")}>
            Xem ảnh bìa
          </Button>
        )}
      </div>

      <div className={cx("profileHeader")}>
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

      <div className={cx("profileDetails")}>
        <div className={cx("bio")}>
          <div className={cx("bioHeader")}>
            <h2>Tiểu sử</h2>
            {isCurrentUserProfile ? (
              <Button
                primary
                small
                className={cx("editBtn")}
                onClick={handleEditBio}
              >
                Sửa
              </Button>
            ) : (
              <Button primary small disabled>
                Xem
              </Button>
            )}
          </div>
          <p>{userProfile?.about || "Chưa có tiểu sử"}</p>
        </div>

        <div className={cx("postContainer")}>
          <h2>Bài viết gần đây</h2>
          {isCurrentUserProfile && <Statusbar />}
          {userPosts.length > 0 ? (
            userPosts
              .slice(0, 3)
              .map((post, index) => (
                <PostItem
                  key={post._id || index}
                  avatar={post.authorId.profilePicture}
                  name={post.authorId.fullname}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  description={post.content}
                  media={post.image}
                  emoCount={post.likes.length}
                  commentCount={post.comments.length}
                  liked={post.liked}
                  saved={post.saved}
                />
              ))
          ) : (
            <p className={cx("noPosts")}>Chưa có bài viết nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
