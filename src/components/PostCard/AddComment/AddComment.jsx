import SubmitButton from '../../Form/Buttons/SubmitButton';
import styles from './AddComment.module.css';
import Textarea from '../../Form/Textarea/Textarea';
import { useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../../utils/fetchApi';
import { useRef } from 'react';

function AddComment({ setIsSentComment, postId, textareaRef }) {
  const [token, , user, , setIsLoading] = useOutletContext();
  console.log(textareaRef);
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
        <img className={styles.avatar} src={user.avatar_url} alt="avatar" />
      </div>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <Textarea
          name="content"
          placeholder="Write a comment..."
          ref={textareaRef}
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
