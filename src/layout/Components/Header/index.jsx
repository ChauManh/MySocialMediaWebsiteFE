import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "../../../components/Button";
import images from "../../../../src/assets/images";
import { Link, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Avatar from "../../../components/Avatar";
import { useAuth } from "../../../contexts/authContext";

const cx = classNames.bind(styles);

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleProfile = () => {
    navigate(`/profile/${user.userId}`);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("menu")}>
          <div className={cx("logo")}>
            <Link to="/home">
              <img src={images.logo} alt="Logo" />
            </Link>
          </div>
          <span className={cx("webName")}>MT.SOCIAL.MEDIA</span>
        </div>

        <div className={cx("search-bar")}>
          <button className={cx("search-btn")}>
            <i className="bi bi-search"></i>
          </button>
          <input type="text" placeholder="Search accounts or posts..." />
        </div>

        <div className={cx("menu")}>
          <Tippy content="Messages" placement="bottom">
            <Button circle className={cx("messageBtn")}>
              <i className="bi bi-chat-left-text-fill"></i>
            </Button>
          </Tippy>

          <Tippy content="Notifications" placement="bottom">
            <Button circle>
              <i className="bi bi-bell-fill"></i>
            </Button>
          </Tippy>
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
              <Avatar image={user.profilePicture} pdl />
            </div>
          </Tippy>
        </div>
      </div>
    </header>
  );
}

export default Header;
