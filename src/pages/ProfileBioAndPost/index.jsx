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
    if (userPost.EC !== 0) {
      toast.error(userPost.EM);
      return;
    }
    setUserPosts(userPost.result);
  };

  useEffect(() => {
    const fetchAllProfile = async () => {
      const userInfo = await getUserInfo(userId);
      await fetchPosts();
      setUserProfile(userInfo.result);
    };
    fetchAllProfile();
  }, [userId]);

  const handleEditBio = () => {
    if (isCurrentUserProfile) {
      setNewBio(userProfile.about || "");
      setIsEditingBio(true);
    } else {
      toast.error("Bạn không thể sửa tiểu sử của người khác.");
    }
  };

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
  };

  const handleSaveBio = async () => {
    try {
      if (newBio === userProfile.about) {
        setIsEditingBio(false);
        return;
      }
      const result = await updateUserAbout(newBio);
      console.log(result);
      if (result.EC == 0) {
        toast.success(result.EM);
        setUserProfile((prev) => ({ ...prev, about: newBio }));
        setIsEditingBio(false);
      } else {
        setIsEditingBio(false);
        toast.error(result.EM);
      }
    } catch (error) {
      toast.error(error.message || "Lỗi ngoài server khi cập nhật tiểu sử.");
    }
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
          {userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <PostItem
                key={post._id || index}
                avatar={post?.authorId.profilePicture}
                name={post?.authorId.fullname}
                comments={post.comments}
                createdAt={post.createdAt}
                description={post.content}
                media={post.images || []}
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

export default ProfileBioAndPost;
