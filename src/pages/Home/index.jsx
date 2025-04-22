import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import PostItem from "../../components/PostItem";
import Statusbar from "../../components/Statusbar";
import { useEffect, useState } from "react";
import { getPostsToDisplay } from "../../services/postApi";
import toast from "react-hot-toast";
const cx = classNames.bind(styles);

function Home() {
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPostsToDisplay();
      if (result.EC === 0) {
        setPosts(result.result);
      } else toast.error(result?.EM);
    };
    fetchPosts();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Statusbar> </Statusbar>
      <div className={cx("postContainer")}>
        {Posts?.length > 0 ? (
          Posts.map((post) => <PostItem key={post._id} postData={post} />)
        ) : (
          <p className={cx("noPosts")}>
            Hãy kết bạn để xem thêm nhiều bài viết.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
