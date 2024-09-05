import styles from './Buttons.module.css';
function CancelButton({ type, name, clickHandler, style }) {
  return (
    <button
      className={styles.cancelButton}
      style={style}
      type={type}
      onClick={clickHandler}
    >
      {name}
    </button>
  );
}
export default CancelButton;
