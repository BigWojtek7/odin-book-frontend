import CancelButton from '../Form/Buttons/cancelButton';
import SubmitButton from '../Form/Buttons/SubmitButton';
import styles from './Modal.module.css';
import { useEffect, useRef } from 'react';
function Modal({title='Confirmation', isShow, onRequestClose, onRequestSubmit, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isShow) {
      return dialogRef.current.showModal();
    }
    dialogRef.current.close();
  }, [isShow]);

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <h1>{title}</h1>
      <p className={styles.children}>{children}</p>
      <div className={styles.buttons}>
        <CancelButton
          type="button"
          name="Close"
          clickHandler={onRequestClose}
        />
        {onRequestSubmit && (
          <SubmitButton
            type="button"
            name="Submit"
            clickHandler={onRequestSubmit}
            style={{ marginLeft: '10px' }}
          />
        )}
      </div>
    </dialog>
  );
}
export default Modal;
