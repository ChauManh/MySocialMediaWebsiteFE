import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import React, { useEffect, useState } from "react";
import images from "../../assets/images";
import { getUserInfo } from "../../services/userApi";
import PostItem from "../../components/PostItem";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import { getPosts } from "../../services/postApi";
import formatDate from "../../utils/formatDate";
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Profile() {
  const { user } = useAuth();
  const { userId: paramUserId } = useParams(); // Lấy userId từ URL
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result = await getUserInfo(paramUserId);
        setUserProfile(result.result);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [paramUserId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const result = await getPosts(paramUserId);
        setUserPosts(result.result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [paramUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const isCurrentUserProfile = paramUserId === user.userId; // So sánh userId từ URL với userId trong context

  const handleEditAvatar = () => {
    if (isCurrentUserProfile) {
      alert("Chức năng sửa avatar đang được phát triển.");
    } else {
      alert("Bạn không thể sửa avatar của người khác.");
    }
  };

  const handleEditCover = () => {
    if (isCurrentUserProfile) {
      alert("Chức năng sửa ảnh bìa đang được phát triển.");
    } else {
      alert("Bạn không thể sửa ảnh bìa của người khác.");
    }
  };

  const handleEditBio = () => {
    if (isCurrentUserProfile) {
      alert("Chức năng sửa tiểu sử đang được phát triển.");
    } else {
      alert("Bạn không thể sửa tiểu sử của người khác.");
    }
  };

  return (
    <div className={cx("profileContainer")}>
      <div className={cx("coverPhotoContainer")}>
        <img
          src={userProfile?.coverPhoto || images.avatar}
          alt="Cover"
          className={cx("coverPhoto")}
        />
        {isCurrentUserProfile ? (
          <button className={cx("editBtn", "editCoverBtn")} onClick={handleEditCover}>
            Sửa ảnh bìa
          </button>
        ) : (
          <button className={cx("editBtn", "editCoverBtn")}>
            Xem ảnh bìa
          </button>
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
        <div className={cx("userName")}>
          <h1>{userProfile?.fullname}</h1>
        </div>
      </div>

      <div className={cx("profileDetails")}>
        <div className={cx("bio")}>
          <div className={cx("bioHeader")}>
            <h2>Tiểu sử</h2>
            {isCurrentUserProfile ? (
              <button className={cx("editBtn")} onClick={handleEditBio}>
                Sửa
              </button>
            ) : (
              <button className={cx("editBtn")} disabled>
                Xem
              </button>
            )}
          </div>
          <p>{userProfile?.about || "Chưa có tiểu sử"}</p>
        </div>

        <div className={cx("postContainer")}>
          <h2>Bài viết gần đây</h2>

          {/* Hiển thị statusBar chỉ khi người dùng là chủ sở hữu của profile */}
          {isCurrentUserProfile && (
            <div className={cx("statusBar")}>
              <div className={cx("itemBar")}>
                <Avatar image={images.avatar} />
                <span className={cx("itemText")}>{user.fullname}, What are you thinking?</span>
              </div>
              <div className={cx("actions")}>
                <Button primary className={cx("postBtn")}>
                  Add a new post
                </Button>
              </div>
            </div>
          )}

          {userPosts.length > 0 ? (
            userPosts.slice(0, 3).map((post, index) => (
              <PostItem
                key={post._id || index}
                avatar={post.authorId.profilePicture}
                name={post.authorId.fullname}
                comments={post.comments}
                createdAt={formatDate(post.createdAt)}
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
