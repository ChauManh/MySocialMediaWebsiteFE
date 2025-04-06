import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import images from '../../assets/images';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import PostItem from '../../components/PostItem';

const cx = classNames.bind(styles);

const postList = [
  {
    id: 1,
    avatar: images.avatar,
    name: 'John Doe',
    createdAt: '3 hours ago',
    description: 'Had a great time exploring the mountains! 🏔️',
    media: [{ type: 'image', url: 'https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/2090486035-1676518664908.jpg' }],
    emoCount: 12,
    commentCount: 3,
    liked: false,
    saved: false,
  },
  {
    id: 2,
    avatar: images.avatar,
    name: 'Jane Smith',
    createdAt: '1 day ago',
    description: 'Loving the new coffee shop in town! ☕',
    media: [{ type: 'image', url: 'https://texascoffeeschool.com/wp-content/uploads/2021/10/DSC_0052-scaled.jpg' }],
    emoCount: 25,
    commentCount: 8,
    liked: true,
    saved: false,
  },
  {
    id: 3,
    avatar: images.avatar,
    name: 'Alice Johnson',
    createdAt: '2 days ago',
    description: 'Check out my new painting! 🎨',
    media: [{ type: 'image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtih7CtkSyyovW7Ucrk5jz4kV0tiy6ioIWVQ&s' }],
    emoCount: 30,
    commentCount: 5,
    liked: false,
    saved: true,
  },
];

function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('statusBar')}>
        <div className={cx('itemBar')}>
          <Avatar image={images.avatar} />
          <span className={cx('itemText')}>What are you thinking?</span>
        </div>
        <div className={cx('actions')}>
          <Button primary className={cx('postBtn')}>
            Add a new post
          </Button>
        </div>
      </div>

      <div className={cx('postContainer')}>
      {postList.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
