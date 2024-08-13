import { useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../../utils/fetchApiGet';
import styles from './Comment.module.css';
import { useEffect, useState } from 'react';

import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import requestWithNativeFetch from '../../../utils/fetchApi';
function Comment({ postId, isSentComment }) {
  const [comments, setComments] = useState([]);
  const [token, , user, isLoading, setIsLoading] = useOutletContext();
  const [deleteRes, setDeleteRes] = useState({});

  useEffect(() => {
    const fetchDataForComments = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/${postId}/comments`;
        const headers = {
          Authorization: token,
        };
        const commentsData = await getRequestWithNativeFetch(url, headers);
        setComments(commentsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForComments();

    return () => {
      setComments([]);
    };
  }, [token, postId, isSentComment]);

  const handleDelete = (e) => {
    e.preventDefault();
    const commentId = e.currentTarget.value;
    setIsLoading(true);
    const fetchDataForDelete = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/posts/comments/${commentId}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeleteRes(deleteData);

        if (deleteData.success) {
          setDeleteRes(deleteData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForDelete();
  };
  return (
    <>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.comment_id}>
          <div className={styles.imgDiv}>
            <img src={comment.avatar_url} alt="avatar" />
          </div>
          <div className={styles.commentMain}>
            <p className={styles.commentName}>{comment.author}</p>
            <p className={styles.commentContent}>{comment.content}</p>
            <div>
              <p className={styles.commentDate}>{comment.date_format}</p>
              {comment.author_id === user.user_id && (
                <button
                  className={styles.trashIcon}
                  value={comment.comment_id}
                  onClick={handleDelete}
                >
                  <Icon path={mdiTrashCan} size={1} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default Comment;
