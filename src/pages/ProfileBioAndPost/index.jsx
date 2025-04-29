import classNames from "classnames/bind";
import styles from "./ProfileBioAndPost.module.scss";
import React, { useEffect, useState } from "react";
import { getUserInfo, updateUserAbout } from "../../services/userApi";
import PostItem from "../../components/PostItem";
import Button from "../../components/Button";
import { getPosts } from "../../services/postApi";
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Statusbar from "../../components/Statusbar";

const cx = classNames.bind(styles);

function ProfileBioAndPost() {
  const { user } = useAuth();
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const isCurrentUserProfile = userId === user?._id;

  const fetchPosts = async () => {
    const userPost = await getPosts(userId);
    if (userPost.EC === 0) {
      setUserPosts(userPost.result);
    } else toast.error(userPost.EM);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [userInfo, userPost] = await Promise.all([
        getUserInfo(userId),
        getPosts(userId),
      ]);

      if (userInfo.EC === 0) {
        setUserProfile(userInfo.result);
      } else toast.error(userInfo.EM);

      if (userPost.EC === 0) {
        setUserPosts(userPost.result);
      } else toast.error(userPost.EM);
    };

    fetchData();
  }, [userId]);

  const handleEditBio = () => {
    if (isCurrentUserProfile) {
      setNewBio(userProfile.about || "");
      setIsEditingBio(true);
    } else {
      toast.error("Bạn không thể sửa tiểu sử của người khác");
    }
  };

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
  };

  const handleSaveBio = async () => {
    if (newBio === userProfile.about) return setIsEditingBio(false);
    const result = await updateUserAbout(newBio);
    if (result.EC == 0) {
      toast.success(result.EM);
      setUserProfile((prev) => ({ ...prev, about: newBio }));
      setIsEditingBio(false);
    } else {
      setIsEditingBio(false);
      toast.error(result.EM);
    }
  };

  const handleDelete = (postId) => {
    setUserPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== postId)
    );
  };

  return (
    <div className={cx("profileContainer")}>
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

          {!isEditingBio ? (
            <p>{userProfile?.about || "Chưa có tiểu sử"}</p>
          ) : (
            <div className={cx("bioEditWrapper")}>
              <textarea
                className={cx("bioTextarea")}
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                rows={3}
              />
              <div className={cx("bioEditActions")}>
                <Button small primary onClick={handleSaveBio}>
                  Hoàn thành
                </Button>
                <Button small outline onClick={handleCancelEditBio}>
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className={cx("postContainer")}>
          {isCurrentUserProfile && <Statusbar onPostSuccess={fetchPosts} />}

          <h2>Bài viết gần đây</h2>
          {userPosts?.length > 0 ? (
            userPosts.map((post) => (
              <PostItem
                key={post._id}
                postData={post}
                onDelete={handleDelete}
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

export default ProfileBioAndPost;
