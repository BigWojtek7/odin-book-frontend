import styles from './Button.module.css';
function Button({ children, onClick, value, style }) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      value={value}
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
