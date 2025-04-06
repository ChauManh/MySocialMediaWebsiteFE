import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function CommentItem({ avatar, name, createdAt, description }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('info')}>
        <Avatar image={avatar} small />
        <div className={cx('comment')}>
          <span className={cx('name')}>{name}</span>
          <span className={cx('description')}>{description}</span>
        </div>
      </div>
      {/* <div className={cx('comment')}>
        <p>{description}</p>
      </div> */}
    </div>
  );
}

export default CommentItem;
