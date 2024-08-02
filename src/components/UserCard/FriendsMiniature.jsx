import styles from './FriendsMiniature.module.css'

function FriendsMiniature() {
  return (
    <div className={styles.container}>
      <img src="https://i.pravatar.cc/45" alt="Friend's avatar miniature" />
      <p className={styles.name}>Michael Jayson</p>
    </div>
  )
}
export default FriendsMiniature