import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import MenuItem from "../../../components/SidebarItem";
const cx = classNames.bind(styles);
import { useAuth } from "../../../contexts/authContext";

function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className={cx("wrapper")}>
      <MenuItem to={`/profile/${user.userId}`} icon="bi bi-person-circle" label={user.fullname} />
      <MenuItem to="/" icon="bi bi-people" label="Friends" />
      <MenuItem to="/" icon="bi bi-postcard" label="Your Posts" />
      <MenuItem to="/" icon="bi bi-floppy" label="Saved" />
    </aside>
  );
}

export default Sidebar;
