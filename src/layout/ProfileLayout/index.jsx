import classNames from "classnames/bind";
import Header from "../Components/Header";
import styles from "./ProfileLayout.module.scss";
import { useAuth } from "../../contexts/authContext";
import { useState, useEffect, useRef } from "react";
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
  updateAvatar,
  updateBackground,
  deleteAvatar,
  deleteBackground,
} from "../../services/userApi";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import { useLoading } from "../../contexts/loadingContext";
import ImageModal from "../../components/ImageModal";

const cx = classNames.bind(styles);

function ProfileLayout({ children }) {
  const { user, setUser } = useAuth();
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const { setIsLoading } = useLoading();
  const [isFriend, setIsFriend] = useState(false);
  const [hasSentReq, setHasSentReq] = useState(false);
  const [hasReceivedReq, setHasReceivedReq] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const fileInputRef = useRef();
  const isCurrentUserProfile = userId === user?._id;
  const location = useLocation();
  const currentPath = location.pathname;
  const [imageModal, setImageModal] = useState({
    open: false,
    url: "",
    type: "image",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      setShowAvatarOptions(false);
      setShowBackgroundOptions(false);
      const userInfo = await getUserInfo(userId);
      if (userInfo.EC === 0) {
        setIsFriend(userInfo.result.friends.includes(user?._id));
        setHasSentReq(
          userInfo.result.friendRequests?.received.includes(user?._id)
        );
        setHasReceivedReq(
          userInfo.result.friendRequests?.sent.includes(user?._id)
        );
        setUserProfile(userInfo.result);
      } else {
        toast.error(userInfo.EM);
      }
      setIsLoading(false);
    };
    fetchUserInfo();
  }, [userId, user?._id, setIsLoading]);

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      toast.error("Vui lòng chọn một tệp.");
      return;
    }
    setIsLoading(true);
    let result = null;
    if (editingAvatar) {
      result = await updateAvatar(file);
    } else {
      result = await updateBackground(file);
    }

    if (result.EC === 0) {
      if (editingAvatar) {
        setUserProfile((prev) => ({
          ...prev,
          profilePicture: result.result.profilePicture,
        }));
        setUser((prev) => ({
          ...prev,
          profilePicture: result.result.profilePicture,
        }));
      } else {
        setUserProfile((prev) => ({
          ...prev,
          backgroundPicture: result.result.backgroundPicture,
        }));
        setUser((prev) => ({
          ...prev,
          backgroundPicture: result.result.backgroundPicture,
        }));
      }
    }
    toast.success(result.EM);
    setIsLoading(false);
    setShowAvatarOptions(false);
    setShowBackgroundOptions(false);
  };

  const handleEditAvatar = () => {
    if (!isCurrentUserProfile) {
      setImageModal({
        open: true,
        url: userProfile?.profilePicture || images.avatar,
        type: "image",
      });
      return;
    }
    setEditingAvatar(true);
    setShowBackgroundOptions(false);
    setShowAvatarOptions(!showAvatarOptions);
  };

  const handleDeleteAvatar = async () => {
    setIsLoading(true);
    const result = await deleteAvatar();
    if (result.EC === 0) {
      setUserProfile((prev) => ({
        ...prev,
        profilePicture: null,
      }));
      setUser((prev) => ({
        ...prev,
        profilePicture: null,
      }));
      toast.success(result.EM);
      setIsLoading(false);
      setShowAvatarOptions(false);
    } else {
      toast.error(result.EM);
      setIsLoading(false);
      setShowAvatarOptions(false);
    }
  };

  const handleDeleteBackground = async () => {
    setIsLoading(true);
    const result = await deleteBackground();
    if (result.EC === 0) {
      setUserProfile((prev) => ({
        ...prev,
        backgroundPicture: null,
      }));
      setUser((prev) => ({
        ...prev,
        backgroundPicture: null,
      }));
      toast.success(result.EM);
      setIsLoading(false);
      setShowBackgroundOptions(false);
    } else {
      toast.error(result.EM);
      setIsLoading(false);
      setShowBackgroundOptions(false);
    }
  };

  const handleEditCover = () => {
    if (!isCurrentUserProfile) {
      setImageModal({
        open: true,
        url: userProfile?.backgroundPicture || images.empty,
        type: "image",
      });
      return;
    }
    setEditingAvatar(false);
    setShowAvatarOptions(false);
    setShowBackgroundOptions(!showBackgroundOptions);
  };

  const handleFriendAction = async (actionType) => {
    try {
      let result;
      switch (actionType) {
        case "send":
          result = await sendFriendRequest(userId);
          if (result.EC === 0) {
            setHasSentReq(true);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        case "cancel":
          result = await cancelFriendRequest(userId);
          if (result.EC === 0) {
            setHasSentReq(false);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        case "unfriend":
          result = await unfriend(userId);
          if (result.EC === 0) {
            setIsFriend(false);
            setUserProfile((prev) => ({
              ...prev,
              friends: prev.friends.filter((id) => id !== user?._id),
            }));
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        case "accept":
          result = await acceptFriendRequest(userId);
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
          }
          break;

        case "deny":
          result = await denyFriendRequest(userId);
          if (result.EC === 0) {
            setHasReceivedReq(false);
            toast.success(result.EM);
          } else {
            toast.error(result.EM);
          }
          break;

        default:
          toast.error("Hành động không hợp lệ");
          return;
      }
    } catch (error) {
      toast.error(error.message || "Lỗi hệ thống");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("profileHeader")}>
        <div className={cx("coverPhotoContainer")}>
          <img
            src={userProfile?.backgroundPicture || images.empty}
            alt="Cover"
            className={cx("coverPhoto")}
            onClick={handleEditCover}
          />
          {showBackgroundOptions && (
            <div className={cx("backgroundOptions")}>
              {!userProfile?.backgroundPicture ? (
                <Button small primary onClick={handleOpenFileDialog}>
                  Thêm ảnh bìa
                </Button>
              ) : (
                <>
                  <Button
                    small
                    outline
                    onClick={() =>
                      setImageModal({
                        open: true,
                        url: userProfile?.backgroundPicture || images.empty,
                        type: "image",
                      })
                    }
                  >
                    Xem ảnh
                  </Button>
                  <Button
                    small
                    primary
                    className="btn-no-margin-left"
                    onClick={handleOpenFileDialog}
                  >
                    Sửa ảnh bìa
                  </Button>
                  <Button
                    small
                    outline
                    onClick={handleDeleteBackground}
                    className="btn-no-margin-left"
                  >
                    Xóa ảnh bìa
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        <div className={cx("profileInfoAndActions")}>
          <div className={cx("avatarWrapper")}>
            <img
              src={userProfile?.profilePicture || images.avatar}
              alt="Avatar"
              className={cx("avatar")}
              onClick={handleEditAvatar}
            />
            {showAvatarOptions && (
              <div className={cx("avatarOptions")}>
                {!userProfile?.profilePicture ? (
                  <Button small primary onClick={handleOpenFileDialog}>
                    Thêm ảnh đại diện
                  </Button>
                ) : (
                  <>
                    <Button
                      small
                      outline
                      onClick={() =>
                        setImageModal({
                          open: true,
                          url: userProfile?.profilePicture || images.avatar,
                          type: "image",
                        })
                      }
                    >
                      Xem ảnh
                    </Button>
                    <Button
                      small
                      primary
                      className="btn-no-margin-left"
                      onClick={handleOpenFileDialog}
                    >
                      Sửa ảnh đại diện
                    </Button>
                    <Button
                      small
                      outline
                      onClick={handleDeleteAvatar}
                      className="btn-no-margin-left"
                    >
                      Xóa ảnh đại diện
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className={cx("nameAndAction")}>
            <div className={cx("userInfo")}>
              <h1>{userProfile?.fullname}</h1>
              <span>{userProfile?.friends?.length} bạn bè</span>
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
          <Link to={`/profile/${userId}`}>
            <Button
              small
              className={
                currentPath === `/profile/${userId}` ? "primary" : "outline"
              }
            >
              Bài viết
            </Button>
          </Link>
          <Link to={`/profile/${userId}/friends`}>
            <Button
              small
              className={
                currentPath === `/profile/${userId}/friends`
                  ? "primary"
                  : "outline"
              }
            >
              Bạn bè
            </Button>
          </Link>
          {isCurrentUserProfile && (
            <Link to={`/profile/${userId}/saved-posts`}>
              <Button
                small
                className={
                  currentPath === `/profile/${userId}/saved-posts`
                    ? "primary"
                    : "outline"
                }
              >
                Đã lưu
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className={cx("container")}>{children}</div>
      {imageModal.open && (
        <ImageModal
          mediaList={[{ url: imageModal.url, type: imageModal.type }]}
          currentIndex={0}
          onClose={() => setImageModal({ open: false, url: "", type: "image" })}
          onChangeIndex={() => {}}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ProfileLayout;
