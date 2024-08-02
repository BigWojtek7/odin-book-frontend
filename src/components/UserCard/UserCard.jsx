import styles from './UserCard.module.css';
import FriendsMiniature from './FriendsMiniature';
function UserCard() {
  return (
    <div className={styles.card}>
      <img className={styles.profileImage} src="https://i.pravatar.cc/125" alt="avatar" />
      <div className={styles.profileMain}>
        <h2 className={styles.profileName}>James Smith</h2>
        <p className={styles.profilePosition}>Graphic Designer</p>
        <p className={styles.profileBody}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi esse
          dignissimos odio, nulla consequuntur non iusto officiis excepturi
          voluptatem provident, inventore eveniet quas.
        </p>
      </div>
      <h2>Friends:</h2>
      <div className={styles.profileFriends}>
        <FriendsMiniature />
        <FriendsMiniature />
        <FriendsMiniature />
        <FriendsMiniature />
        <FriendsMiniature />
        <FriendsMiniature />
        <FriendsMiniature />
      </div>
    </div>
  );
}
export default UserCard;
