import styles from './Post.module.css';
import Icon from '@mdi/react';
import { mdiThumbUp, mdiMessage, mdiTrashCan } from '@mdi/js';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../../utils/fetchApi';
function Post({ postId, date, author, content, avatarURL, postLikes }) {
  const [deleteRes, setDeleteRes] = useState({});
  const [token, , user, isLoading, setIsLoading] = useOutletContext();

  const handleDelete = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForDelete = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`;
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
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img src={avatarURL} alt="avatar" />
        <div>
          <p className={styles.name}>{author}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <p className={styles.postContent}>{content}</p>
      <hr />
      <ul className={styles.listIcons}>
        <li className={styles.listItem}>
          <Icon path={mdiThumbUp} size={1} />
          {`Like (${postLikes})`}
        </li>
        <li className={styles.listItem}>
          <Icon path={mdiMessage} size={1} />
          Comment
        </li>
        <li className={styles.listItem} onClick={handleDelete}>
          <Icon path={mdiTrashCan} size={1} />
          Delete
        </li>
      </ul>
      <hr />
    </div>
  );
}
export default Post;
