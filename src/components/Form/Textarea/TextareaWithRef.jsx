import { forwardRef } from 'react';
import styles from './Textarea.module.css';

const TextareaWithRef = forwardRef(function TextareaWithRef(props, ref) {
  return (
    <div className={styles.formGroup}>
      {props?.label && <label htmlFor={props.name}>{props.label}</label>}
      <textarea
        style={props.style}
        placeholder={props.placeholder}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        className={styles.textarea}
        ref={ref}
      ></textarea>
      {props.error && <p className={styles.error}>{props.error}</p>}
    </div>
  );
});

export default TextareaWithRef;
