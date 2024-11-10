import styles from './Input.module.css';

function Input({
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autocomplete = 'off',
}) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
        autoComplete={autocomplete}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
