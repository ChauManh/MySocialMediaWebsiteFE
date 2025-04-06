import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuItem from '../../../components/MenuItem';
const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <MenuItem to="/" icon="bi bi-person-circle" label="Châu Mạnh" />
      <MenuItem to="/" icon="bi bi-people" label="Friends" />
      <MenuItem to="/" icon="bi bi-postcard" label="Your Posts" />
      <MenuItem to="/" icon="bi bi-floppy" label="Saved" />
    </aside>
  );
}

export default Sidebar;
