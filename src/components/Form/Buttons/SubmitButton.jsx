import styles from './Buttons.module.css';
function SubmitButton({ children, onClick, type, style }) {
  return (
    <button
      className={styles.submitButton}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default SubmitButton;
