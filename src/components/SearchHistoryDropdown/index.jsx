import styles from "./SearchHistoryDropdown.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function SearchHistoryDropdown({ historyList, onSelect, onDelete }) {
  if (!historyList || historyList.length === 0) return null;

  return (
    <div className={cx("wrapper")}>
      {historyList.map((item, idx) => {
        if (item.type === "keyword") {
          return (
            <div key={idx} className={cx("item")}>
              <div
                className={cx("clickable")}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(item);
                }}
              >
                <i className="bi bi-search"></i> {item.keyword}
              </div>
              <i
                className="bi bi-x"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onDelete(item, idx);
                }}
              />
            </div>
          );
        }

        if (item.type === "user") {
          return (
            <div key={idx} className={cx("item")}>
              <Link
                to={`/profile/${item.user._id}`}
                className={cx("clickable")}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(item);
                }}
              >
                <img
                  src={item.user.profilePicture || images.avatar}
                  alt="avatar"
                  className={cx("avatar")}
                />
                <span>{item.user.fullname}</span>
              </Link>
              <i
                className="bi bi-x"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onDelete(item, idx);
                }}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default SearchHistoryDropdown;
