import styles from './Buttons.module.css';
function CancelButton({ children, onClick, type = 'button', style }) {
  return (
    <button
      className={styles.cancelButton}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default CancelButton;
