import classNames from "classnames/bind";
import styles from "./Avatar.module.scss";

const cx = classNames.bind(styles);

function Avatar({ image, pdl = false, small = false, smallSize = false }) {
  return (
    <div className={cx("wrapper", { pdl, small: small || smallSize })}>
      <img
        src={image}
        alt="Avatar"
        className={cx("avatar", { small: small || smallSize })}
      />
    </div>
  );
}

export default Avatar;
