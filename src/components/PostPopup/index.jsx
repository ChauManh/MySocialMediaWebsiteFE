import classNames from "classnames/bind";
import styles from "./PostPopup.module.scss";
import Button from "../Button";
import { useState, useEffect } from "react";
import ImageModal from "../ImageModal";

const cx = classNames.bind(styles);

export default function PostPopup({
  user,
  content,
  setContent,
  setImageFiles,
  previewUrl,
  setPreviewUrl,
  onClose,
  onSubmit,
}) {
  const [modalIndex, setModalIndex] = useState(null);

  // Đóng modal bằng phím Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalIndex(null);
      if (e.key === "ArrowLeft" && modalIndex > 0) setModalIndex((i) => i - 1);
      if (e.key === "ArrowRight" && modalIndex < previewUrl.length - 1)
        setModalIndex((i) => i + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalIndex, previewUrl.length]);

  return (
    <>
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
            accept="image/*,video/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImageFiles(files);
              const previews = files.map((file) => ({
                url: URL.createObjectURL(file),
                type: file.type.startsWith("video") ? "video" : "image",
              }));
              setPreviewUrl(previews);
            }}
          />
          {previewUrl.length > 0 && (
            <div className={cx("imagePreviewWrapper")}>
              {previewUrl.map((item, index) =>
                item.type === "video" ? (
                  <video
                    key={index}
                    src={item.url}
                    className={cx("imagePreview")}
                    onClick={() => setModalIndex(index)}
                  />
                ) : (
                  <img
                    key={index}
                    src={item.url}
                    alt={`preview-${index}`}
                    className={cx("imagePreview")}
                    onClick={() => setModalIndex(index)}
                  />
                )
              )}
            </div>
          )}
          <div className={cx("popupActions")}>
            <Button onClick={onSubmit} primary>
              Đăng
            </Button>
            <Button onClick={onClose} outline>
              Huỷ
            </Button>
          </div>
        </div>
      </div>

      {modalIndex !== null && (
        <ImageModal
          mediaList={previewUrl}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onChangeIndex={setModalIndex}
        />
      )}
    </>
  );
}
