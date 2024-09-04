import CancelButton from '../Form/Buttons/cancelButton';
import SubmitButton from '../Form/Buttons/SubmitButton';
import styles from './Modal.module.css';
import { useEffect, useRef } from 'react';
function Modal({ isShow, onRequestClose, onRequestSubmit, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    console.log(isShow);
    if (isShow) {
      return dialogRef.current.showModal();
    }
    dialogRef.current.close();
  }, [isShow]);

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <h1>Confirmation</h1>
      <p className={styles.children}>{children}</p>
      <CancelButton type="button" name="Cancel" clickHandler={onRequestClose} />
      <SubmitButton type="button" name="Submit" onClick={onRequestSubmit} style={{'margin-left': '10px'}}/>
    </dialog>
  );
}
export default Modal;
