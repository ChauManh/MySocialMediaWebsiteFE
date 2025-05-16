import { useEffect } from "react";
import styles from "./ImageModal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function ImageModal({
  mediaList,
  currentIndex,
  onClose,
  onChangeIndex,
}) {
  const currentMedia = mediaList[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onChangeIndex(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < mediaList.length - 1)
        onChangeIndex(currentIndex + 1);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, mediaList.length, onClose, onChangeIndex]);

  return (
    <div className={cx("overlay")} onClick={onClose}>
      <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
        <button className={cx("closeBtn")} onClick={onClose}>
          &times;
        </button>

        {currentMedia.type === "image" ? (
          <img src={currentMedia.url} alt="preview" />
        ) : (
          <video
            src={currentMedia.url}
            controls
            autoPlay
            muted
            className={cx("videoModal")}
          />
        )}

        {mediaList.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                className={cx("navBtn", "left")}
                tabIndex={0}
                onClick={() => onChangeIndex(currentIndex - 1)}
              >
                &#8592;
              </button>
            )}
            {currentIndex < mediaList.length - 1 && (
              <button
                className={cx("navBtn", "right")}
                onClick={() => onChangeIndex(currentIndex + 1)}
              >
                &#8594;
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
