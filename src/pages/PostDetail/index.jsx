import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailPost, commentPost } from "../../services/postApi";
import PostItem from "../../components/PostItem";
import FullScreenLoading from "../../components/FullScreenLoading";
import toast from "react-hot-toast";
import classNames from "classnames/bind";
import styles from "./PostDetail.module.scss";
const cx = classNames.bind(styles);

function PostDetail() {
  const { id } = useParams(); // postId
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    const res = await getDetailPost(id);
    if (res.EC === 0) {
      setPostData(res.result);
    } else {
      toast.error(res.EM);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleDelete = () => {
    // Điều hướng về trang trước sau khi xóa nếu cần
    toast.success("Bài viết đã bị xoá.");
  };

  return loading ? (
    <FullScreenLoading />
  ) : (
    <div className={cx("wrapper")}>
      <div className={cx("postContainer")}>
        <h2>Chi tiết bài viết</h2>
        {postData && (
          <PostItem
            postData={postData}
            onDelete={handleDelete}
            showAllComments // custom prop để ép hiển thị tất cả bình luận
          />
        )}
      </div>
    </div>
  );
}

export default PostDetail;
