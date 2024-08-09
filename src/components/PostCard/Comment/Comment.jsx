import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../../utils/fetchApiGet';
import styles from './Comment.module.css';
import { useEffect, useState } from 'react';
function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  useEffect(() => {
    setIsLoading(true);

    const fetchDataForMessages = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/${postId}/comments`;
        const headers = {
          Authorization: token,
        };
        const commentsData = await getRequestWithNativeFetch(url, headers);
        setComments(commentsData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForMessages();

    return () => {
      setComments([]);
    };
  }, [setIsLoading, token, postId]);
  return (
    <>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <div className={styles.imgDiv}>
            <img src={comment.avatar_url} alt="avatar" />
          </div>
          <div className={styles.commentMain}>
            <p className={styles.commentName}>{comment.author}</p>
            <p className={styles.commentContent}>{comment.content}</p>
            <p className={styles.commentDate}>{comment.date_format}</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default Comment;
