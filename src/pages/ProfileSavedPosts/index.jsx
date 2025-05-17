import classNames from "classnames/bind";
import styles from "./ProfileSavedPosts.module.scss";
import { useEffect, useState } from "react";
import { getSavedPosts } from "../../services/postApi";
import { useLoading } from "../../contexts/loadingContext";
import SavedPostItem from "../../components/SavedPostItem";
import toast from "react-hot-toast";

const cx = classNames.bind(styles);

function ProfileSavedPosts() {
  const { setIsLoading } = useLoading();
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setIsLoading(true);
      const res = await getSavedPosts();
      if (res.EC === 0) {
        setSavedPosts(res.result);
      } else {
        toast.error(res.EM);
      }
      setIsLoading(false);
    };

    fetchSavedPosts();
  }, [setIsLoading]);

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Bài viết đã lưu</h2>
      {savedPosts.length > 0 ? (
        savedPosts.map((item, index) => (
          <SavedPostItem
            key={index}
            post={item.post}
            savedAt={item.savedAt}
            onUnsave={() => {
              setSavedPosts((prev) =>
                prev.filter((p) => p.post._id !== item.post._id)
              );
            }}
          />
        ))
      ) : (
        <p className={cx("empty")}>Bạn chưa lưu bài viết nào.</p>
      )}
    </div>
  );
}

export default ProfileSavedPosts;
