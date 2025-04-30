import classNames from 'classnames/bind';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import FriendSidebar from '../Components/FriendSidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />
        <div className={cx('content')}>{children}</div>
        <FriendSidebar />
      </div>
    </div>
  );
}

export default DefaultLayout;
