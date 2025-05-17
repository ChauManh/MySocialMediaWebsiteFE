// components/PostOptionsMenu.jsx
import classNames from "classnames/bind";
import styles from "./PostOptionsMenu.module.scss";
import { useAuth } from "../../contexts/authContext";

const cx = classNames.bind(styles);

export default function PostOptionsMenu({
  onDelete,
  onSave,
  isSaved,
  postAuthorId,
}) {
  const { user } = useAuth();
  const isOwner = user?._id === postAuthorId;
  return (
    <div className={cx("menuWrapper")}>
      <button className={cx("menuItem")} onClick={onSave}>
        {isSaved ? "Hủy lưu" : "Lưu"}
      </button>
      {isOwner && (
        <button className={cx("menuItem", "delete")} onClick={onDelete}>
          Xóa bài viết
        </button>
      )}
    </div>
  );
}
