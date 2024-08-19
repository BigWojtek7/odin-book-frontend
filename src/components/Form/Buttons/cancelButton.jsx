import styles from './Buttons.module.css';
function CancelButton({ type, name, style, clickHandler }) {
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
