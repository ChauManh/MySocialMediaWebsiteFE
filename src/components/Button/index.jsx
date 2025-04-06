import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

// Sử dụng forwardRef để chuyển tiếp ref
const Button = forwardRef(
  (
    {
      to,
      href,
      primary,
      outline,
      circle,
      small,
      large,
      text,
      disabled,
      rounded,
      className,
      onClick,
      children,
      ...passProps
    },
    ref,
  ) => {
    let Comp = 'button';
    const props = {
      onClick,
      ref, // Truyền ref vào props
      ...passProps,
    };

    if (disabled) {
      Object.keys(props).forEach((key) => {
        if (key.startsWith('on') && typeof props[key] === 'function') {
          delete props[key];
        }
      });
    }

    const classes = cx('wrapper', {
      [className]: className,
      primary,
      outline,
      circle,
      small,
      large,
      text,
      rounded,
    });

    if (to) {
      props.to = to;
      Comp = 'Link';
    } else if (href) {
      props.href = href;
      Comp = 'a';
    }

    return (
      <Comp className={classes} {...props}>
        <span className={cx('title')}>{children}</span>
      </Comp>
    );
  },
);

// Đặt displayName cho component (không bắt buộc nhưng hữu ích cho debugging)
Button.displayName = 'Button';

export default Button;
