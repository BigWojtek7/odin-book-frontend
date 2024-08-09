import styles from './FriendsMiniature.module.css';

function FriendsMiniature({name, avatarURL}) {
  return (
    <div className={styles.container}>
      <img src={avatarURL} alt="Friend's avatar miniature" />
      <p className={styles.name}>{name}</p>
    </div>
  );
}
export default FriendsMiniature;
