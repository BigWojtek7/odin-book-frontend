import styles from './NotificationsList.module.css';

function NotificationsList({ notifications }) {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.notificationsContainer}>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          data-testid={`notification-${notif.type}`}
          className={`${styles.notification} ${styles[notif.type]}`}
        >
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
}

export default NotificationsList;
