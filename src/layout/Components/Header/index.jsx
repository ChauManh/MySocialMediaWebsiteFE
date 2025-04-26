import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "../../../components/Button";
import images from "../../../../src/assets/images";
import { Link, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Avatar from "../../../components/Avatar";
import { useAuth } from "../../../contexts/authContext";
import { useState } from "react";
import NotificationBar from "../../../components/NotificationBar";

const cx = classNames.bind(styles);

function Header() {
  const { user, setUser } = useAuth();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/");
  };

  const handlePressLogo = () => {
    window.location.href = "/home";
  };

  const handleSearch = () => {
    if (keyword) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleProfile = () => {
    navigate(`/profile/${user?._id}`);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("menu")}>
          <div className={cx("logo")}>
            <button onClick={handlePressLogo}>
              <img src={images.logo} alt="Logo" />
            </button>
          </div>
          <span className={cx("webName")}>MT.SOCIAL.MEDIA</span>
        </div>

        <div className={cx("search-bar")}>
          <button className={cx("search-btn")} onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Tìm bạn bè hoặc bài viết..."
          />
        </div>

        <div className={cx("menu")}>
          <Tippy content="Messages" placement="bottom">
            <Button circle className={cx("messageBtn")}>
              <i className="bi bi-chat-left-text-fill"></i>
            </Button>
          </Tippy>

          <div className={cx("notification-wrapper")}>
            <Tippy content="Notifications" placement="bottom">
              <Button
                circle
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="bi bi-bell-fill"></i>
              </Button>
            </Tippy>

            {showNotifications && <NotificationBar />}
          </div>
          <Tippy
            content={
              <div className={cx("user-menu")}>
                <button className={cx("menu-item")} onClick={handleProfile}>
                  Xem thông tin
                </button>
                <button className={cx("menu-item")} onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            }
            placement="bottom"
            interactive={true}
            trigger="mouseenter focus click"
          >
            <div>
              <Avatar image={user?.profilePicture || images.avatar} pdl />
            </div>
          </Tippy>
        </div>
      </div>
    </header>
  );
}

export default Header;
