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

const cx = classNames.bind(styles);

function Statusbar({ onPostSuccess }) {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const { setIsLoading } = useLoading();
  const [content, setContent] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleAddPost = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setContent("");
    setImageFiles(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
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
        <div className={cx("popupOverlay")}>
          <div className={cx("popupContent")}>
            <h3>Đăng bài viết mới</h3>
            <textarea
              placeholder={`${user?.fullname}, bạn đang nghĩ gì?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={cx("captionInput")}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setImageFiles(files);
                const previews = files.map((file) => URL.createObjectURL(file));
                setPreviewUrl(previews);
              }}
            />
            {previewUrl && previewUrl.length > 0 && (
              <div className={cx("imagePreviewWrapper")}>
                {previewUrl.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview-${index}`}
                    className={cx("imagePreview")}
                  />
                ))}
              </div>
            )}
            <div className={cx("popupActions")}>
              <Button onClick={handleSubmitPost} primary>
                Đăng
              </Button>
              <Button onClick={handleClosePopup} outline>
                Huỷ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Statusbar;
