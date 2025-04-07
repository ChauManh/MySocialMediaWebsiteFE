import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';

const cx = classNames.bind(styles);

function SidebarItem({ to, icon, label }) {
  return (
    <Link to={to} className={cx('wrapper')}>
      <div className={cx('icon')}>
        <i className={`${icon}`}></i>
      </div>
      <span className={cx('label')}>{label}</span>
    </Link>
  );
}

export default SidebarItem;
