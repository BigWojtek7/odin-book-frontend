import { Link, useOutletContext } from 'react-router-dom';
import getRequestWithNativeFetch from '../../../utils/fetchApiGet';
import styles from './Comment.module.css';
import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import useAuth from '../../../contexts/Auth/useAuth';
import useComments from '../../../hooks/useComments';
import useModal from '../../../contexts/Modal/useModal';
import useNotification from '../../../contexts/Notification/useNotification';
import useLoader from '../../../contexts/Loader/useLoader';
import requestWithNativeFetch from '../../../utils/requestWithNativeFetch';

import AddComment from '../AddComment/AddComment';

function Comment({
  postId,
  textareaRef,
  forceRenderComments,
  setShowModal,
  setCommentId,
  deleteCommentRes,
}) {
  // const [comments, setComments] = useState([]);
  const { token, user } = useAuth();

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const { comments, setComments } = useComments(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`
  );

  const handleDeleteComment = (commentId) => {
    openModal('Do you really want to delete this comment?', async () => {
      try {
        loaderStart();
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'delete',
        };
        const deletePostData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/comments/${commentId}`,
          options
        );
        if (deletePostData.success) {
          setComments((prevPosts) =>
            prevPosts.filter(
              (comment) => comment.comment_id !== Number(commentId)
            )
          );
          addNotification('The comment has been deleted', 'success');
        }
      } catch (err) {
        console.log(err);
      } finally {
        loaderStop();
        closeModal();
      }
    });
  };

  return (
    <>
      <AddComment postId={postId} textareaRef={textareaRef}/>
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
                  onClick={() => handleDeleteComment(comment.comment_id)}
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
