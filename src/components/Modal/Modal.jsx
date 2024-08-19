import CancelButton from '../Form/Buttons/cancelButton';
import SubmitButton from '../Form/Buttons/SubmitButton';
import styles from './Modal.module.css';
import { useEffect, useRef } from 'react';
function Modal({ isShow = true, onRequestClose, onRequestSubmit, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if(isShow){
      dialogRef.current.showModal();
    }
  },[isShow])
  

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <h1>Confirmation</h1>
      <p>{children}</p>
      <CancelButton type="button" name="Cancel" onClick={onRequestClose} />
      <SubmitButton type="button" name="Submit" onClick={onRequestSubmit} />
    </dialog>
  );
}
export default Modal;
