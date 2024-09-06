import styles from './Post.module.css';
import Icon from '@mdi/react';
import { mdiThumbUp, mdiMessage, mdiTrashCan } from '@mdi/js';
import { Link, useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../../utils/fetchApi';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../../utils/fetchApiGet';

function Post({
  postId,
  date,
  author,
  authorId,
  content,
  avatarURL,
  inputRef,
  setDeletePostId,
  setShowPostModal,
  setShowLikeModal
}) {
  const [token, ,user , , ,] = useOutletContext();
  const [postLikes, setPostLikes] = useState({ post_likes: '?' });
  const [isLikeAdded, setIsLikeAdded] = useState(false);
  const handleCommentClick = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    const fetchDataForLikes = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/likes`;
        const headers = {
          Authorization: token,
        };
        const postLikesData = await getRequestWithNativeFetch(url, headers);
        if (typeof postLikesData !== 'undefined') {
          setPostLikes(postLikesData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLikeAdded(false);
      }
    };
    fetchDataForLikes();

    return () => {
      setPostLikes({ post_likes: '?' });
    };
  }, [postId, token, isLikeAdded]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const fetchDataForAddLike = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/likes`;
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token,
        };
        const addLikeData = await requestWithNativeFetch(url, 'POST', headers);
        if (addLikeData.success) {
          setIsLikeAdded(true);
        }
        if (!addLikeData.success){
          setShowLikeModal(true)
        }

      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForAddLike();
  };

  const handleDelete = () => {
    setShowPostModal(true);
    setDeletePostId(postId);
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
          {`Like (${postLikes.post_likes})`}
        </li>
        <li className={styles.listItem} onClick={handleCommentClick}>
          <Icon path={mdiMessage} size={1} />
          Comment
        </li>
        {authorId === user.user_id && (
          <li
            className={`${styles.listItem} ${styles.deleteItem}`}
            onClick={handleDelete}
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
