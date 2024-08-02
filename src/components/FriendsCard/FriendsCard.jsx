import styles from './FriendsCard.module.css'
import Friend from './Friend'
function FriendsCard() {
  return (
    <div className={styles.container}>
      <h2>Friends:</h2>
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
    </div>
  )
}
export default FriendsCard