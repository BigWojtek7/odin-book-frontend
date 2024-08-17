import styles from './FriendsMiniature.module.css';
import { Link } from 'react-router-dom';
function FriendsMiniature({ followerId, name, avatarURL }) {
  return (
    <Link className={styles.name} to={`/profile/${followerId}`}>
      <div className={styles.container}>
        <img className={styles.avatar} src={avatarURL} alt="Friend's avatar miniature" />
        <p className={styles.name}>{name}</p>
      </div>
    </Link>
  );
}
export default FriendsMiniature;
