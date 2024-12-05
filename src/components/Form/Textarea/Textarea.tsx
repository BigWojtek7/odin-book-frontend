import styles from './Textarea.module.css';

function Textarea({ name, label, placeholder, value, onChange, style, error }) {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        id={name}
        value={value}
        style={style}
        onChange={onChange}
        className={styles.textarea}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Textarea;
