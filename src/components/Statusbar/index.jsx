import classNames from "classnames/bind";
import styles from "./Statusbar.module.scss";
import { useAuth } from "../../contexts/authContext";
import Avatar from "../Avatar";
import Button from "../Button";
import { useState } from "react";

const cx = classNames.bind(styles);

function Statusbar() {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddPost = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCaption("");
    setImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSubmitPost = () => {
    console.log("Caption:", caption);
    console.log("Image file:", image);
    alert("Bài viết đã được đăng (giả lập).");

    handleClosePopup();
  };

  return (
    <div className={cx("statusBar")}>
      <div className={cx("itemBar")}>
        <Avatar image={user?.profilePicture} />
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
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className={cx("captionInput")}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && (
              <div className={cx("imagePreviewWrapper")}>
                <img
                  src={previewUrl}
                  alt="preview"
                  className={cx("imagePreview")}
                />
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
