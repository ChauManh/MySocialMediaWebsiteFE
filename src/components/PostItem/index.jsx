import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import Avatar from '../Avatar';
import { useState } from 'react';
import CommentItem from '../CommentItem';
import images from '../../assets/images';

const cx = classNames.bind(styles);
function PostItem({
  avatar,
  name,
  createdAt,
  description,
  media = [],
  emoCount,
  commentCount,
  liked = false,
  saved = false,
}) {
  const [isLiked, setLike] = useState(liked);
  const [isSaved, setSave] = useState(saved);
  const [likeCount, setLikeCount] = useState(emoCount);

  const handleLike = () => {
    setLike(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const handleSave = () => {
    setSave(!isSaved);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('topBar')}>
        <div className={cx('infoWrapper')}>
          <Avatar image={avatar} />
          <div className={cx('info')}>
            <a href="/" className={cx('name')}>
              {name}
            </a>
            <span className={cx('createdAt')}>{createdAt}</span>
          </div>
        </div>
        <button className={cx('moreOptionsBtn')}>
          <i className="bi bi-three-dots"></i>
        </button>
      </div>
      <div className={cx('content')}>
        <p className={cx('description')}>{description}</p>
        {media.length > 0 && (
          <div className={cx('media', media.length === 1 ? 'single' : media.length === 2 ? 'double' : 'multiple')}>
            {media.map((item, index) =>
              item.type === 'image' ? (
                <img key={`image-${index}`} src={item.url} alt={`media-${index}`} className={cx('mediaItem')} />
              ) : (
                <video key={`video-${index}`} controls className={cx('mediaItem')}>
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ),
            )}
          </div>
        )}
      </div>
      <div className={cx('postStatus')}>
        <div className={cx('emoCountBar')}>
          <i className="bi bi-emoji-smile"></i>
          <span className={cx('emoCount')}>{likeCount}</span>
        </div>
        <div className={cx('commentCountBar')}>
          <span className={cx('commentCount')}>{commentCount}</span>
          <i className="bi bi-chat-right-text-fill"></i>
        </div>
      </div>
      <div className={cx('actions')}>
        <button className={cx('likeBtn', { liked: isLiked })} onClick={handleLike}>
          <i className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}> Likes</i>
        </button>
        <button className={cx('commentBtn')}>
          <i className="bi bi-chat-right-dots"> Comments</i>
        </button>
        <button className={cx('saveBtn', { saved: isSaved })} onClick={handleSave}>
          <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}> Saves</i>
        </button>
      </div>
      {commentCount > 0 && (
        <div className={cx('commentSection')}>
          <button className={cx('showCommentsBtn')}>Shows more comments</button>
          <CommentItem avatar={images.logo} name="Chau Manh" createdAt="28/10/2024" description="Hahahahahaha" />
        </div>
      )}
    </div>
  );
}

export default PostItem;
