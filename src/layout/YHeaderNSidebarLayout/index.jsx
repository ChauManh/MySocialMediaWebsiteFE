import classNames from "classnames/bind";
import Header from "../Components/Header";
import styles from "./YHeaderNSidebarLayout.module.scss";

const cx = classNames.bind(styles);

function YHeaderNSidebarLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        {children}
        {/* <div className={cx("content")}>{children}</div> */}
      </div>
    </div>
  );
}

export default YHeaderNSidebarLayout;
