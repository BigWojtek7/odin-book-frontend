import styles from './Textarea.module.css';

function Textarea({ name, label, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={styles.textarea}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Textarea;
