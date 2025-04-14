import classNames from "classnames/bind";
import styles from "./PostItem.module.scss";
import Avatar from "../Avatar";
import { useState } from "react";
import CommentItem from "../CommentItem";
import formatDate from "../../utils/formatDate";
import images from "../../assets/images";

const cx = classNames.bind(styles);
function PostItem({
  avatar,
  name,
  createdAt,
  description,
  media,
  emoCount,
  commentCount,
  comments = [],
  liked = false,
  saved = false,
}) {
  const [isLiked, setLike] = useState(liked);
  const [isSaved, setSave] = useState(saved);
  const [likeCount, setLikeCount] = useState(emoCount);

  const handleLike = () => {
    setLike(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleSave = () => {
    setSave(!isSaved);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("topBar")}>
        <div className={cx("infoWrapper")}>
          <Avatar image={avatar || images.avatar} />
          <div className={cx("info")}>
            <a href="/home" className={cx("name")}>
              {name}
            </a>
            <span className={cx("createdAt")}>{formatDate(createdAt)}</span>
          </div>
        </div>
        <button className={cx("moreOptionsBtn")}>
          <i className="bi bi-three-dots"></i>
        </button>
      </div>
      <div className={cx("content")}>
        <p className={cx("description")}>{description}</p>
        {media.length > 0 && (
          <div
            className={cx(
              "media",
              media.length === 1
                ? "single"
                : media.length === 2
                  ? "double"
                  : "multiple"
            )}
          >
            {media.map((item, index) =>
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
            Likes
          </i>
        </button>
        <button className={cx("commentBtn")}>
          <i className="bi bi-chat-right-dots"> Comments</i>
        </button>
        <button
          className={cx("saveBtn", { saved: isSaved })}
          onClick={handleSave}
        >
          <i className={`bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}`}>
            {" "}
            Saves
          </i>
        </button>
      </div>
      {comments.length > 0 ? (
        <div className={cx("commentSection")}>
          {/* Nút "Hiển thị tất cả bình luận" */}
          <button className={cx("showCommentsBtn")}>
            Hiển thị tất cả bình luận
          </button>

          {/* Hiển thị 1 bình luận đầu tiên */}
          {comments.slice(0, 1).map((comment) => (
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
