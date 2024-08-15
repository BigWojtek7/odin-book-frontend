import styles from './Input.module.css';
function Input({ type, name, labelName, isControlled, inputValue, setInputValue }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{labelName}</label>
      {isControlled ? (
        <input
          type={type}
          id={name}
          name={name}
          value={inputValue || ''}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <input type={type} id={name} name={name} />
      )}
    </div>
  );
}
export default Input;
