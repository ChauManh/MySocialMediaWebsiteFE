import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ image, pdl = false, small = false }) {
  return (
    <div className={cx('wrapper', { pdl }, { small })}>
      <img src={image} alt="Avatar" className={cx('avatar')} />
    </div>
  );
}

export default Avatar;
