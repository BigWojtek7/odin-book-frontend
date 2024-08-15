import SubmitButton from '../../Form/Buttons/SubmitButton';
import styles from './AddComment.module.css';
import Textarea from '../../Form/Textarea/Textarea';
import { useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../../utils/fetchApi';

function AddComment({ setIsSentComment, postId }) {
  const [token, , user, , setIsLoading] = useOutletContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForCreateComment = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/${postId}/comments`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const data = {
          content: e.target.content.value,
        };
        const createCommentData = await requestWithNativeFetch(
          url,
          'POST',
          headers,
          data
        );
        if (createCommentData.success) {
          setIsSentComment(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForCreateComment();
  };
  return (
    <div className={styles.addComment}>
      <div>
        <img src={user.avatar_url} alt="avatar" />
      </div>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <Textarea name="content" placeholder="Write a comment..."></Textarea>
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
