import SubmitButton from '../../Form/Buttons/SubmitButton';
import styles from './AddComment.module.css';
import Textarea from '../../Form/Textarea/Textarea';
import { useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../../utils/fetchApi';
import { useEffect } from 'react';

function AddComment({
  setForceRenderComments,
  postId,
  textareaRef,
  addCommentFetch,
  setAddCommentFetch,
}) {
  const [token, , user, , ,] = useOutletContext();
  const handleSubmit = (e) => {
    e.preventDefault();
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
        setAddCommentFetch(createCommentData);
        if (createCommentData.success) {
          setForceRenderComments((prev) => prev + 1);
        }
      } catch (err) {
        console.log(err);
      } finally {
        e.target.reset();
      }
    };
    fetchDataForCreateComment();
  };
  useEffect(() => {
    if (addCommentFetch) {
      const timeoutId = setTimeout(() => {
        setAddCommentFetch('');
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [setAddCommentFetch, addCommentFetch]);

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
      {addCommentFetch &&
        addCommentFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
    </div>
  );
}
export default AddComment;
