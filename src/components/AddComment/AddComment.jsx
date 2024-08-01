import Button from '../Form/Button'
import styles from './AddComment.module.css';
function AddComment() {
  return (
    <div className={styles.addComment}>
      <div><img src="https://i.pravatar.cc/45" alt="avatar" /></div>
      <form className={styles.commentForm}>
        <textarea className={styles.commentTextarea} name="comment" placeholder='Write a comment...'></textarea>
        <Button type='submit' name='Post' />
      </form>
    </div>
  );
}
export default AddComment;
