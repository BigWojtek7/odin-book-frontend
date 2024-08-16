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
  handleDeletePost,
  inputRef,
}) {
  const [token, , user, , setIsLoading] = useOutletContext();
  const [postLikes, setPostLikes] = useState([]);
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
        setPostLikes(postLikesData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLikeAdded(false);
      }
    };
    fetchDataForLikes();

    return () => {
      setPostLikes([]);
    };
  }, [postId, token, isLikeAdded]);

  console.log(postLikes);
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
        const addLikeData = await requestWithNativeFetch(
          url,
          'POST',
          headers
        );
        console.log(addLikeData);
        if (addLikeData.success) {
          setIsLikeAdded(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForAddLike();
  };

  console

  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img src={avatarURL} alt="avatar" />
        <div>
          <Link className={styles.name} to={`/profile/${authorId}`}>
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
        {handleDeletePost && (
          <li
            className={`${styles.listItem} ${styles.deleteItem}`}
            onClick={(e) => handleDeletePost(e, postId)}
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
