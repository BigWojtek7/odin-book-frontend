import styles from './Post.module.css';
import Icon from '@mdi/react';
import { mdiThumbUp, mdiMessage, mdiTrashCan } from '@mdi/js';
import { Link } from 'react-router-dom';
function Post({
  postId,
  date,
  author,
  authorId,
  content,
  avatarURL,
  postLikes,
  handleDeletePost,
}) {
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
        <li className={styles.listItem}>
          <Icon path={mdiThumbUp} size={1} />
          {`Like (${postLikes})`}
        </li>
        <li className={styles.listItem}>
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
