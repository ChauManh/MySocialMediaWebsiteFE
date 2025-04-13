import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import PostItem from "../../components/PostItem";
import { useAuth } from "../../contexts/authContext";
import Statusbar from "../../components/Statusbar";
import { useEffect, useState } from "react";
import { getPosts } from "../../services/postApi";
const cx = classNames.bind(styles);

function Home() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?.userId) return; // Nếu chưa có user thì không fetch

      try {
        const result = await getPosts(user.userId);
        setUserPosts(result.result);
      } catch (error) {
        alert(error.message);
        // console.error("Error fetching posts:", error);
      }
    };

    fetchUserPosts();
  }, [user]);

  return (
    <div className={cx("wrapper")}>
      <Statusbar> </Statusbar>

      <div className={cx("postContainer")}>
        {userPosts?.length > 0 ? (
          userPosts.map((post, index) => (
            <PostItem
              key={post._id || index}
              avatar={post.authorId.profilePicture}
              name={post.authorId.fullname}
              comments={post.comments}
              createdAt={post.createdAt}
              description={post.content}
              media={post.image}
              emoCount={post.likes.length}
              commentCount={post.comments.length}
              liked={post.liked}
              saved={post.saved}
            />
          ))
        ) : (
          <p className={cx("noPosts")}>Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
