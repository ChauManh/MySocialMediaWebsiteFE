import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./SidebarItem.module.scss";
import Avatar from "../Avatar";

const cx = classNames.bind(styles);

function SidebarItem({ to, icon, image, label, collapsed = false }) {
  return (
    <Link to={to} className={cx("wrapper", { collapsed })}>
      <div className={cx("icon")}>
        {image ? <Avatar image={image} smallSize /> : <i className={icon}></i>}
      </div>
      {!collapsed && <span className={cx("label")}>{label}</span>}
    </Link>
  );
}

export default SidebarItem;
