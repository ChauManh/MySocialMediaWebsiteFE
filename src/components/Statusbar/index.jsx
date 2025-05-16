import classNames from "classnames/bind";
import styles from "./Statusbar.module.scss";
import { useAuth } from "../../contexts/authContext";
import Avatar from "../Avatar";
import Button from "../Button";
import { useState } from "react";
import { createPost } from "../../services/postApi";
import { useLoading } from "../../contexts/loadingContext";
import images from "../../assets/images";
import toast from "react-hot-toast";
import PostPopup from "../PostPopup";

const cx = classNames.bind(styles);

function Statusbar({ onPostSuccess }) {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const { setIsLoading } = useLoading();
  const [content, setContent] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);

  const handleAddPost = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setContent("");
    setImageFiles([]);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl([]);
    }
  };

  const handleSubmitPost = async () => {
    const postData = new FormData();
    postData.append("content", content);
    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((img) => {
        postData.append("post", img); // Lưu từng ảnh vào FormData
      });
    }
    setIsLoading(true);
    const result = await createPost(postData);

    if (result.EC === 0) {
      toast.success(result.EM);
      if (onPostSuccess) onPostSuccess();
    } else {
      toast.error(result.EM);
    }
    setIsLoading(false);
    handleClosePopup();
  };

  return (
    <div className={cx("statusBar")}>
      <div className={cx("itemBar")}>
        <Avatar image={user?.profilePicture || images.avatar} />
        <span className={cx("itemText")}>
          {user?.fullname}, Bạn đang nghĩ gì?
        </span>
      </div>
      <div className={cx("actions")}>
        <Button primary className={cx("postBtn")} onClick={handleAddPost}>
          Thêm bài viết
        </Button>
      </div>
      {showPopup && (
        <PostPopup
          user={user}
          content={content}
          setContent={setContent}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          onClose={handleClosePopup}
          onSubmit={handleSubmitPost}
        />
      )}
    </div>
  );
}

export default Statusbar;
