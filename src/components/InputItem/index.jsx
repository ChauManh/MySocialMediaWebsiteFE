import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ type, placeholder, value, onChange, name }) {
  return (
    <div className={cx('wrapper')}>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name} />
    </div>
  );
}

export default Input;
