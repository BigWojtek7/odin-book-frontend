import SubmitButton from '../Form/Buttons/SubmitButton';
import styles from './AddComment.module.css';
function AddComment() {
  return (
    <div className={styles.addComment}>
      <div>
        <img src="https://i.pravatar.cc/45" alt="avatar" />
      </div>
      <form className={styles.commentForm}>
        <textarea
          className={styles.commentTextarea}
          name="comment"
          placeholder="Write a comment..."
        ></textarea>
        <SubmitButton type="submit" name="Post" style={{borderRadius: '10px'}} />
      </form>
    </div>
  );
}
export default AddComment;
