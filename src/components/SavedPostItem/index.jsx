import classNames from "classnames/bind";
import styles from "./SavedPostItem.module.scss";
import { Link, useNavigate } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import images from "../../assets/images";
import Button from "../Button";
import Avatar from "../Avatar";
import { useState } from "react";
import ImageModal from "../ImageModal";
import { savePost } from "../../services/postApi";
import toast from "react-hot-toast";
const cx = classNames.bind(styles);

function SavedPostItem({ post, savedAt, onUnsave }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const navigate = useNavigate();

  const firstMedia = post?.media?.[0];

  const handleCancelSavePost = async () => {
    const res = await savePost(post._id);
    if (res.EC === 0) {
      toast.success(res.EM);
      onUnsave?.();
    } else toast.error(res.EM);
  };

  const handleNavigateToPost = () => {
    navigate(`/post/${post._id}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("topRightAction")}>
        <Button small outline onClick={handleCancelSavePost}>
          Bỏ lưu
        </Button>
      </div>
      <div className={cx("thumbnail")} onClick={handleOpenModal}>
        {firstMedia?.type === "video" ? (
          <video src={firstMedia.url} muted className={cx("mediaPreview")} />
        ) : (
          <img
            src={firstMedia?.url}
            alt="preview"
            className={cx("mediaPreview")}
          />
        )}
      </div>

      <div className={cx("infoSection")} onClick={handleNavigateToPost}>
        <h4 className={cx("postTitle")}>{post.content}</h4>
        <p className={cx("meta")}>
          Bài viết • Đã lưu vào {formatDate(savedAt)}
        </p>

        <div className={cx("authorSection")}>
          <Avatar image={post.authorId?.profilePicture || images.avatar} />
          <Link
            to={`/profile/${post.authorId?._id}`}
            className={cx("authorName")}
          >
            {post.authorId?.fullname}
          </Link>
        </div>
      </div>

      {modalOpen && (
        <ImageModal
          mediaList={post.media}
          currentIndex={0}
          onClose={handleCloseModal}
          onChangeIndex={() => {}}
        />
      )}
    </div>
  );
}

export default SavedPostItem;
