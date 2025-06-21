import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "../../../components/Button";
import images from "../../../../src/assets/images";
import { useNavigate } from "react-router-dom";
import "tippy.js/themes/light.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Avatar from "../../../components/Avatar";
import { useAuth } from "../../../contexts/authContext";
import { useState } from "react";
import NotificationBar from "../../../components/NotificationBar";
import MessageBar from "../../../components/MessageBar";
import {
  addUserHistorySearch,
  getSearchHistory,
  deleteOneSearchHistoryByIndex,
} from "../../../services/userHistoryApi";
import SearchHistoryDropdown from "../../../components/SearchHistoryDropdown";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function Header() {
  const { user, setUser, setToken } = useAuth();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showConversations, setShowConversations] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const handlePressLogo = () => {
    window.location.href = "/home";
  };

  const handleDelete = async (item, index) => {
    const res = await deleteOneSearchHistoryByIndex(index);
    if (res.EC === 0) {
      toast.success(res.EM);
      setSearchHistory(res.result);
    } else {
      toast.error(res.EM);
    }
  };

  const handleSearch = async (item) => {
    if (item) {
      if (item.type === "user") {
        await addUserHistorySearch("user", item.user);
        navigate(`/profile/${item.user._id}`);
      } else if (item.type === "keyword") {
        await addUserHistorySearch("keyword", item.keyword.trim());
        navigate(`/search?keyword=${encodeURIComponent(item.keyword.trim())}`);
      }
    } else if (keyword.trim()) {
      await addUserHistorySearch("keyword", keyword.trim());
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
    setKeyword("");
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
          <span className={cx("webName")}>MT SOCIAL MEDIA</span>
        </div>

        <div className={cx("search-bar")}>
          <button className={cx("search-btn")} onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={async () => {
              const history = await getSearchHistory();
              setSearchHistory(history.result || []);
              setShowHistory(true);
            }}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            placeholder="Tìm bạn bè hoặc bài viết..."
          />
          {showHistory && (
            <SearchHistoryDropdown
              historyList={searchHistory}
              onSelect={(item) => {
                handleSearch(item);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>

        <div className={cx("menu")}>
          <div className={cx("message-wrapper")}>
            <Tippy content="Messages" placement="bottom">
              <Button
                circle
                onClick={() => setShowConversations(!showConversations)}
              >
                <i className="bi bi-chat-left-text-fill"></i>
              </Button>
            </Tippy>
            {showConversations && (
              <MessageBar setShowConversations={setShowConversations} />
            )}
          </div>

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
            trigger="click"
            theme="light"
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
