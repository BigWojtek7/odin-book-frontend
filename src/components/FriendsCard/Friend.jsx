import { Link } from 'react-router-dom';
import styles from './Friend.module.css';

function Friend({ followerId, name, friendsNumber, avatarURL, style }) {
  return (
    <div className={styles.container} style={style}>
      <img className={styles.img} src={avatarURL} alt="Friend's Avatar" />
      <div className={styles.friendInfo}>
        <Link to={`../profile/${followerId}`} className={styles.name}>
          {name}
        </Link>
        <p className={styles.friendsNumber}>{`${friendsNumber} friends`}</p>
      </div>
    </div>
  );
}
export default Friend;
