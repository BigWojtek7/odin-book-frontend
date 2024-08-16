import styles from './Textarea.module.css';
import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea(props, ref) {
  console.log(props);
  const labelName = `${props.name[0].toUpperCase()}${props.name.slice(1)}`;
  return (
    <div className={styles.formGroup}>
      {props.isLabel && <label htmlFor={props.name}>{labelName}</label>}
      {props.isControlled ? (
        <textarea
          className={styles.textarea}
          style={props.style}
          placeholder={props.placeholder}
          id={props.name}
          name={props.name}
          value={props.inputValue || ''}
          onChange={(e) => props.setInputValue(e.target.value)}
          ref={ref}
        />
      ) : (
        <textarea
          className={styles.textarea}
          style={props.style}
          placeholder={props.placeholder}
          id={props.name}
          name={props.name}
          ref={ref}
        />
      )}
    </div>
  );
});

export default Textarea;
