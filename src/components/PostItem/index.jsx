import classNames from "classnames/bind";
import styles from "./PostItem.module.scss";
import Avatar from "../Avatar";
import { useState, useEffect, useRef } from "react";
import CommentItem from "../CommentItem";
import formatDate from "../../utils/formatDate";
import images from "../../assets/images";
import Button from "../Button";
import { useAuth } from "../../contexts/authContext";
import { deletePost, likePost } from "../../services/postApi";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);
function PostItem({ postData, onDelete }) {
  const { user } = useAuth();
  const [isLiked, setLike] = useState(postData?.likes?.includes(user._id));
  const [isSaved, setSave] = useState(false);
  const [likeCount, setLikeCount] = useState(postData?.likes?.length);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [commentCount, setCommentCount] = useState(postData?.comments?.length);

  const handleLike = async () => {
    const res = await likePost(postData._id);
    if (res.EC === 0) {
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      setLike(!isLiked);
    } else toast.error(res.EM);
  };

  const moreOptionsRef = useRef(null); // ref vùng chứa
  const handleClickOutside = (event) => {
    if (
      moreOptionsRef.current &&
      !moreOptionsRef.current.contains(event.target)
    ) {
      setShowDeleteOption(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeletePost = async () => {
    const res = await deletePost(postData._id);
    if (res.EC === 0) {
      onDelete?.(postData._id);
      toast.success(res.EM);
    } else toast.error(res.EM);
  };

  const handleSave = () => {
    setSave(!isSaved);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("topBar")}>
        <div className={cx("infoWrapper")}>
          <Avatar image={postData?.authorId?.profilePicture || images.avatar} />
          <div className={cx("info")}>
            <a href="/home" className={cx("name")}>
              {postData?.authorId?.fullname}
            </a>
            <span className={cx("createdAt")}>
              {formatDate(postData?.createdAt)}
            </span>
          </div>
        </div>
        <div className={cx("moreOptionsWrapper")} ref={moreOptionsRef}>
          <button
            className={cx("moreOptionsBtn")}
            onClick={() => setShowDeleteOption(!showDeleteOption)}
          >
            <i className="bi bi-three-dots"></i>
          </button>
          {showDeleteOption && (
            <Button
              small
              primary
              onClick={handleDeletePost}
              className={cx("buttonDelete")}
            >
              Xóa
            </Button>
          )}
        </div>
      </div>
      <div className={cx("content")}>
        <p className={cx("description")}>{postData?.content}</p>
        {postData?.images?.length > 0 && (
          <div
            className={cx(
              "media",
              postData?.images?.length === 1
                ? "single"
                : postData?.images?.length === 2
                  ? "double"
                  : "multiple"
            )}
          >
            {postData?.images.map((item, index) =>
              item.type === "video" ? (
                <video
                  key={`video-${index}`}
                  controls
                  className={cx("mediaItem")}
                >
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  key={`image-${index}`}
                  src={item}
                  alt={`media-${index}`}
                  className={cx("mediaItem")}
                />
              )
            )}
          </div>
        )}
      </div>
      <div className={cx("postStatus")}>
        <div className={cx("emoCountBar")}>
          <i className="bi bi-emoji-smile"></i>
          <span className={cx("emoCount")}>{likeCount}</span>
        </div>
        <div className={cx("commentCountBar")}>
          <span className={cx("commentCount")}>{commentCount}</span>
          <i className="bi bi-chat-right-text-fill"></i>
        </div>
      </div>
      <div className={cx("actions")}>
        <button
          className={cx("likeBtn", { liked: isLiked })}
          onClick={handleLike}
        >
          <i
            className={`bi ${isLiked ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}`}
          >
            {" "}
            Thích
          </i>
        </button>
        <button className={cx("commentBtn")}>
          <i className="bi bi-chat-right-dots"> Bình luận</i>
        </button>
        <button
          className={cx("saveBtn", { saved: isSaved })}
          onClick={handleSave}
        >
          <i className={`bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}`}>
            {" "}
            Lưu
          </i>
        </button>
      </div>
      {commentCount > 1 ? (
        <div className={cx("commentSection")}>
          {/* Nút "Hiển thị tất cả bình luận" */}
          <button className={cx("showCommentsBtn")}>
            Hiển thị tất cả bình luận
          </button>

          {/* Hiển thị 1 bình luận đầu tiên */}
          {postData?.comments.slice(0, 1).map((comment) => (
            <CommentItem
              key={comment._id}
              avatar={comment.userId.profilePicture}
              name={comment.userId.fullname}
              createdAt={comment.createdAt} // Đảm bảo bạn đã tạo hàm formatDate
              description={comment.content}
            />
          ))}
        </div>
      ) : (
        <div className={cx("commentSection")}>
          <div className={cx("noComments")}>Chưa có bình luận nào.</div>
        </div>
      )}
    </div>
  );
}

export default PostItem;
