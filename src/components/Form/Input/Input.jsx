import styles from './Input.module.css';
function Input({ type, name, labelName, inputValue, setInputValue }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{labelName}</label>
      {setInputValue ? (
        <input
          type={type}
          id={name}
          name={name}
          value={inputValue || ''}
          onChange={setInputValue}
        />
      ) : (
        <input type={type} id={name} name={name} />
      )}
    </div>
  );
}
export default Input;
