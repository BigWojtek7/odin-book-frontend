import styles from './Buttons.module.css';
function SubmitButton({ type, name, style }) {
  return (
    <button className={styles.submitButton} style={style} type={type}>
      {name}
    </button>
  );
}
export default SubmitButton;
