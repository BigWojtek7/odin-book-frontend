import { useContext } from 'react';
import ModalContext from './ModalContext'

const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error(
      'Please use useModal inside the context of ModalProvider'
    );
  }
  return modalContext;
};

export default useModal;
