import { Link, useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../../utils/fetchApiGet';
import styles from './Comment.module.css';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';

function Comment({
  postId,
  forceRenderComments,
  setShowModal,
  setCommentId,
  deleteCommentRes,
}) {
  const [comments, setComments] = useState([]);
  const [token, , user, , , ,] = useOutletContext();

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
  }, [token, postId, forceRenderComments, deleteCommentRes]);

  const handleDelete = (e) => {
    setShowModal(true);
    setCommentId(e.currentTarget.value);
  };

  console.log(user.user_id)
  return (
    <>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.comment_id}>
          <div className={styles.imgDiv}>
            <img
              className={styles.avatar}
              src={comment.avatar_url}
              alt="avatar"
            />
          </div>
          <div className={styles.commentMain}>
            <Link
              to={`/profile/${
                user.user_id === comment.author_id ? '#' : comment.author_id
              }`}
              className={styles.commentName}
            >
              {comment.author_name}
            </Link>
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
