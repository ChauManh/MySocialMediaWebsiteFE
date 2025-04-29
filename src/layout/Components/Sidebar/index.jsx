import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import MenuItem from "../../../components/SidebarItem";
import { useAuth } from "../../../contexts/authContext";
import { useState } from "react";
import images from "../../../assets/images";
const cx = classNames.bind(styles);

function Sidebar() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <aside className={cx("wrapper", { collapsed: isCollapsed })}>
      {/* Nút thu gọn sidebar */}
      <button className={cx("toggle-btn")} onClick={toggleCollapse}>
        {isCollapsed ? (
          <i className="bi bi-chevron-right" />
        ) : (
          <i className="bi bi-chevron-left" />
        )}
      </button>

      <MenuItem
        to={`/profile/${user?._id}`}
        image={user?.profilePicture || images.avatar}
        label={user?.fullname}
        collapsed={isCollapsed}
      />
      <MenuItem
        to={`/profile/${user?._id}/friends`}
        icon="bi bi-people"
        label="Bạn bè"
        collapsed={isCollapsed}
      />
      <MenuItem
        to={`/profile/${user?._id}`}
        icon="bi bi-file-earmark-text"
        label="Bài viết của tôi"
        collapsed={isCollapsed}
      />
    </aside>
  );
}

export default Sidebar;
