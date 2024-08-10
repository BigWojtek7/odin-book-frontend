import styles from './Textarea.module.css'
function Textarea({ name, placeholder, isLabel, style }) {
  const labelName = `${name[0].toUpperCase()}${name.slice(1)}`;
  return (
    <div className={styles.formGroup}>
      {isLabel && <label htmlFor={name}>{labelName}</label>}
      <textarea
        className={styles.textarea}
        style={style}
        placeholder={placeholder}
        id={name}
        name={name}
      />
    </div>
  );
}
export default Textarea;
