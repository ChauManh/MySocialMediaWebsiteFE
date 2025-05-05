import classNames from "classnames/bind";
import styles from "./PostItem.module.scss";
import Avatar from "../Avatar";
import { useState, useEffect, useRef } from "react";
import CommentItem from "../CommentItem";
import formatDate from "../../utils/formatDate";
import images from "../../assets/images";
import Button from "../Button";
import { useAuth } from "../../contexts/authContext";
import { commentPost, deletePost, likePost } from "../../services/postApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function PostItem({ postData, onDelete, showAllComments }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setLike] = useState(postData?.likes?.includes(user?._id));
  const [isSaved, setSave] = useState(false);
  const [likeCount, setLikeCount] = useState(postData?.likes?.length);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [comments, setComments] = useState(postData.comments || []);
  const [commentCount, setCommentCount] = useState(postData?.comments?.length);
  const [textComment, setTextComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const commentInputRef = useRef(null);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleSubmitComment = async () => {
    if (!textComment.trim()) return;

    const res = await commentPost(postData._id, textComment);
    if (res.EC === 0) {
      const newComment = res.result;
      setComments((prev) => [newComment, ...prev]); // cập nhật lại danh sách bình luận
      setTextComment("");
      setCommentCount((prev) => prev + 1);
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const moreOptionsRef = useRef(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = async () => {
    const res = await likePost(postData._id);
    if (res.EC === 0) {
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setLike(!isLiked);
    } else toast.error(res.EM);
  };

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
          <Avatar
            image={
              user?._id === postData?.authorId?._id
                ? user.profilePicture || images.avatar
                : postData?.authorId?.profilePicture || images.avatar
            }
          />
          <div className={cx("info")}>
            <Link
              to={`/profile/${postData?.authorId?._id}`}
              className={cx("name")}
            >
              {postData?.authorId?.fullname}
            </Link>
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
              postData.images.length === 1
                ? "single"
                : postData.images.length === 2
                  ? "double"
                  : "multiple"
            )}
          >
            {postData.images.map((item, index) =>
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
                  onClick={() => handleImageClick(item)}
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
        <button
          className={cx("commentBtn")}
          onClick={() => {
            commentInputRef.current?.focus();
            commentInputRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        >
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

      <div className={cx("commentSection")}>
        {comments.length > 0 ? (
          <>
            {commentCount > 1 && !showAllComments && (
              <button
                className={cx("showCommentsBtn")}
                onClick={() => navigate(`/post/${postData._id}`)}
              >
                Hiển thị tất cả bình luận
              </button>
            )}
            {(showAllComments ? comments : comments.slice(0, 1)).map(
              (comment) => (
                <CommentItem key={comment._id} comment={comment} />
              )
            )}
          </>
        ) : (
          <div className={cx("noComments")}>Chưa có bình luận nào.</div>
        )}
        <div className={cx("commentInputWrapper")}>
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Viết bình luận..."
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
          />
          <Button onClick={handleSubmitComment} primary circle outline>
            <i className="bi bi-send"></i>
          </Button>
        </div>
      </div>
      {selectedImage && (
        <div className={cx("modal")} onClick={() => setSelectedImage(null)}>
          <div
            className={cx("modalContent")}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="preview" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostItem;
