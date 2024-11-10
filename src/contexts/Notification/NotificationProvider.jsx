import { useState } from 'react';
import NotificationContext from './NotificationContext';
import NotificationsList from '../../components/NotificationsList/NotificationsList';

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = new Date().getTime();

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, type },
    ]);

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationsList notifications={notifications} />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
