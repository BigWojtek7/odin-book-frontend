import styles from './Friend.module.css';

function Friend({name, friendsNumber, avatarURL, style}) {

  return (
    <div className={styles.container} style={style}>
      <img src={avatarURL} alt="Friend's Avatar" />
      <div className={styles.friendInfo}>
        <p className={styles.name}>{name}</p>
        <p className={styles.friendsNumber}>{`${friendsNumber} friends`}</p>
      </div>
    </div>
  );
}
export default Friend;
