import classNames from "classnames/bind";
import styles from "./CommentItem.module.scss";
import Avatar from "../Avatar";
import formatDate from "../../utils/formatDate";
import { useAuth } from "../../contexts/authContext";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function CommentItem({ comment }) {
  const { user } = useAuth();
  const { userId, content, createdAt } = comment;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("info")}>
        <Avatar
          image={
            user?._id === userId?._id
              ? user.profilePicture || images.avatar
              : userId.profilePicture || images.avatar
          }
        />
        <div className={cx("comment")}>
          <span className={cx("name")}>{userId.fullname}</span>
          <span className={cx("description")}>{content}</span>
          <span className={cx("createdAt")}>{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
