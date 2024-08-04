import styles from './Friend.module.css';

function Friend({style}) {
  console.log(style)
  return (
    <div className={styles.container} style={style}>
      <img src="https://i.pravatar.cc/45" alt="Friend's Avatar" />
      <div className={styles.friendInfo}>
        <p className={styles.name}>William Markus</p>
        <p className={styles.friendsNumber}>56 friends</p>
      </div>
    </div>
  );
}
export default Friend;
