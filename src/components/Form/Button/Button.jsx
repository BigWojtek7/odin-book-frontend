import styles from './Button.module.css';
function Button({
  children,
  onClick,
  type = 'button',
  style,
  cancelButton = false,
}) {
  return (
    <button
      className={`${styles.button} ${cancelButton ? styles.cancel : ''}`}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
