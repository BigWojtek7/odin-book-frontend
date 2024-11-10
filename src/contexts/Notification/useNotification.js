import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const useNotification = () => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error(
      'Please use useNotification inside the context of NotificationProvider'
    );
  }
  return notificationContext;
};

export default useNotification;
