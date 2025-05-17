import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

export default function NotFound() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("code")}>404</div>
      <div className={cx("message")}>Oops! Không tìm thấy trang</div>
      <div className={cx("description")}>
        Trang bạn đang cố truy cập không tồn tại hoặc đã bị di chuyển.
      </div>
      <Link to="/home" className={cx("button")}>
        Quay về trang chủ
      </Link>
    </div>
  );
}
