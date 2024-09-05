import styles from './Buttons.module.css';
function SubmitButton({ type, name, clickHandler, style }) {
  return (
    <button
      className={styles.submitButton}
      style={style}
      type={type}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}
export default SubmitButton;
