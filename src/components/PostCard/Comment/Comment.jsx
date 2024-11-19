import { Link } from 'react-router-dom';
import styles from './Comment.module.css';
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';
import useAuth from '../../../contexts/Auth/useAuth';
import useComments from '../../../hooks/useComments';
import useModal from '../../../contexts/Modal/useModal';
import useNotification from '../../../contexts/Notification/useNotification';
import useLoader from '../../../contexts/Loader/useLoader';
import requestWithNativeFetch from '../../../utils/requestWithNativeFetch';

import AddComment from '../AddComment/AddComment';

function Comment({ postId, textareaRef }) {
  const { token, user } = useAuth();

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const { comments, setComments } = useComments(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`
  );

  const handleAddComment = async (content) => {
    try {
      loaderStart();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          content: content,
        }),
        method: 'post',
      };

      const createCommentData = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`,
        options
      );

      if (createCommentData.success) {
        setComments((prevComments) => [
          {
            author_id: createCommentData.data.user_id,
            author_name: createCommentData.data.author_name,
            avatar_url: createCommentData.data.avatar_url,

            comment_id: createCommentData.data.id,
            content: createCommentData.data.content,
            date_format: createCommentData.data.date_format,
          },
          ...prevComments,
        ]);
        addNotification('the comment has been created', 'success');
      }
    } catch (err) {
      console.log(err.name);
    } finally {
      loaderStop();
    }
  };

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
      <AddComment
        postId={postId}
        textareaRef={textareaRef}
        handleAddComment={handleAddComment}
      />
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.comment_id}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={comment.avatar_url}
              alt="avatar"
            />
          </div>
          <div className={styles.commentMain}>
            <div className={styles.commentHeader}>
              <div className={styles.authorWithDate}>
                <Link
                  to={`/profile/${
                    user.user_id === comment.author_id ? '#' : comment.author_id
                  }`}
                  className={styles.commentName}
                >
                  {comment.author_name}
                </Link>
                <div>
                  <p className={styles.commentDate}>{comment.date_format}</p>
                </div>
              </div>

              {comment.author_id === user.user_id && (
                <div className={styles.commentDelete}>
                  <button
                    className={styles.trashIcon}
                    onClick={() => handleDeleteComment(comment.comment_id)}
                  >
                    <Icon path={mdiTrashCan}  size={1.2} />
                  </button>
                </div>
              )}
            </div>
            <p className={styles.commentContent}>{comment.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}
export default Comment;
