import styles from './Post.module.css';
import Icon from '@mdi/react';
import { mdiThumbUp, mdiMessage } from '@mdi/js';

function Post() {
  return (
    <div className={styles.post}>
      <div className={styles.postInfo}>
        <img src="https://i.pravatar.cc/45" alt="avatar" />
        <div>
          <p className={styles.name}>James Smith</p>
          <p className={styles.date}>3 min ago</p>
        </div>
      </div>
      <p className={styles.postContent}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        voluptate cum vero, similique qui ipsum nostrum nesciunt delectus illum
        possimus vel nihil, iusto rem veritatis assumenda debitis sint sunt
        enim.
      </p>
      <hr />
      <ul className={styles.listIcons}>
        <li className={styles.listItem}>< Icon path={mdiThumbUp} size={1}/>Like</li>
        <li className={styles.listItem}>< Icon path={mdiMessage} size={1} />Comment</li>
      </ul>
      <hr />
    </div>
  );
}
export default Post;
