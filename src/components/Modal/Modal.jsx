import { createPortal } from 'react-dom';
import useModal from '../../contexts/Modal/useModal';

import styles from './Modal.module.css';
import Button from '../Form/Button/Button.jsx';

function Modal() {
  const { modalData, closeModal } = useModal();

  if (!modalData) return null;

  return (
    <>
      {createPortal(
        <div className={styles.overlay}>
          <div className={styles.content}>
            <p className={styles.message}>{modalData.message}</p>
            <Button
              onClick={modalData.onConfirm}
              style={{ fontSize: '1em' }}
            >
              Yes
            </Button>
            <Button
              cancelButton
              onClick={closeModal}
              style={{ marginLeft: '0.5em', fontSize: '1em' }}
            >
              No
            </Button>
          </div>
        </div>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

export default Modal;
