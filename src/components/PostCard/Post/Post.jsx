import styles from './Post.module.css';
import Icon from '@mdi/react';
import { mdiThumbUp, mdiMessage, mdiTrashCan } from '@mdi/js';
import { Link } from 'react-router-dom';
import requestWithNativeFetch from '../../../utils/requestWithNativeFetch';
import { useEffect, useState } from 'react';
import useAuth from '../../../contexts/Auth/useAuth';
import useNotification from '../../../contexts/Notification/useNotification';

function Post({
  postId,
  date,
  author,
  authorId,
  content,
  avatarURL,
  inputRef,
  inputRefIndex,
  handleDelete,
}) {
  const { token, user } = useAuth();
  const { addNotification } = useNotification();
  const [postLikes, setPostLikes] = useState(0);

  const handleCommentClick = () => {
    inputRef.current[inputRefIndex].focus();
  };

  useEffect(() => {
    const fetchDataForLikes = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/likes`;
        const postLikesData = await requestWithNativeFetch(url, {
          headers: { Authorization: token },
        });
        if (postLikesData && typeof postLikesData.post_likes === 'number') {
          setPostLikes(postLikesData.post_likes);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForLikes();
  }, [postId, token]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/likes`;
      const addLikeData = await requestWithNativeFetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: 'POST',
      });

      if (addLikeData.success) {
        setPostLikes((prevLikes) => prevLikes + 1);
        addNotification('You liked the post', 'success');
      } else {
        addNotification('You already liked this post', 'error');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img className={styles.avatar} src={avatarURL} alt="avatar" />
        <div>
          <Link
            className={styles.name}
            to={`/profile/${user.user_id === authorId ? '#' : authorId}`}
          >
            <p>{author}</p>
          </Link>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <p className={styles.postContent}>{content}</p>
      <hr />
      <ul className={styles.listIcons}>
        <li className={styles.listItem} onClick={handleLikeClick}>
          <Icon path={mdiThumbUp} size={1} />
          {`Like (${postLikes})`}
        </li>
        <li className={styles.listItem} onClick={handleCommentClick}>
          <Icon path={mdiMessage} size={1} />
          Comment
        </li>
        {authorId === user.user_id && (
          <li
            className={`${styles.listItem} ${styles.deleteItem}`}
            onClick={() => handleDelete(postId)}
          >
            <Icon path={mdiTrashCan} size={1} />
            Delete
          </li>
        )}
      </ul>
      <hr />
    </div>
  );
}

export default Post;
