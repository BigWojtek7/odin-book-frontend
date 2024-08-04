import styles from './Input.module.css';
function Input({ type, name, labelName }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{labelName}</label>
      <input type={type} id={name} name={name} />
    </div>
  );
}
export default Input;
