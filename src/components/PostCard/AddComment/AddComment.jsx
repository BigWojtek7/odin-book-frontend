import SubmitButton from '../../Form/Buttons/SubmitButton';
import styles from './AddComment.module.css';
import Textarea from '../../Form/Textarea/Textarea';
function AddComment() {
  return (
    <div className={styles.addComment}>
      <div>
        <img src="https://i.pravatar.cc/45" alt="avatar" />
      </div>
      <form className={styles.commentForm}>
        <Textarea
          name="comment"
          placeholder="Write a comment..."
        ></Textarea>
        <SubmitButton
          type="submit"
          name="Post"
          style={{ borderRadius: '10px' }}
        />
      </form>
    </div>
  );
}
export default AddComment;
