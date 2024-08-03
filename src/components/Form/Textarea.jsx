import styles from './Form.module.css';
function Textarea({ type, name, labelName, isLabel }) {
  return (
    <div className={styles.formGroup}>
      {isLabel && <label htmlFor={name}>{labelName}</label>}
      <textarea type={type} id={name} name={name} />
    </div>
  );
}
export default Textarea;
