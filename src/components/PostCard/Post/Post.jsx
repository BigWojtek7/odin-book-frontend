import styles from './Post.module.css';
import Icon from '@mdi/react';
import { mdiThumbUp, mdiMessage } from '@mdi/js';
function Post({date,  author, content, avatarURL}) {
  console.log(date, avatarURL)
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
          Like
        </li>
        <li className={styles.listItem}>
          <Icon path={mdiMessage} size={1} />
          Comment
        </li>
      </ul>
      <hr />
    </div>
  );
}
export default Post;
