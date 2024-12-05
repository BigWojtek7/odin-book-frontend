import { useState } from 'react';
import ModalContext from './ModalContext';

const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(null);

  const openModal = (message, onConfirm) => {
    setModalData({ message, onConfirm });
  };
  const closeModal = () => {
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
