import styles from './Comment.module.css'
function Comment() {
  return (
    <div className={styles.comment}>
      <div><img src="https://i.pravatar.cc/45" alt="avatar" /></div>
      <div className={styles.commentMain}>
        <p className={styles.commentName}>James Smith</p>
        <p className={styles.commentContent}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum tempore adipisci quaerat eligendi corrupti!</p>
        <p className={styles.commentDate}>18 January at 10:00 AM</p>
      </div>
    </div>
  )
}
export default Comment