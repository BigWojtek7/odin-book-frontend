import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment'
import { useState } from 'react';

function PostCard({ postId, date, author, content, avatarURL, postLikes }) {
  const [isSentComment, setIsSentComment] = useState(false);
  return (
    <>
      <div className={styles.postCard}>
        <Post
          date={date}
          postId={postId}
          author={author}
          content={content}
          avatarURL={avatarURL}
          postLikes={postLikes}
        />
        <AddComment setIsSentComment={setIsSentComment} postId={postId} />
        <Comment postId={postId} isSentComment={isSentComment}/>
      </div>
    </>
  );
}
export default PostCard;
