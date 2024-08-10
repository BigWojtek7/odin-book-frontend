import styles from './AddPost.module.css';
import SubmitButton from '../Form/Buttons/SubmitButton';
import Textarea from '../Form/Textarea/Textarea';
function AddPost({ avatarURL }) {
  return (
    <div className={styles.addPost}>
      <div>
        <img src={avatarURL} alt="avatar" />
      </div>
      <form className={styles.postForm}>
        <Textarea
          style={{height: '6em'}}
          className={styles.postTextarea}
          name="post_content"
          placeholder="Write a post..."
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
export default AddPost;
