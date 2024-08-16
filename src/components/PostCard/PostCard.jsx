import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';
import { useRef, useState } from 'react';

function PostCard({
  postId,
  date,
  author,
  authorId,
  content,
  avatarURL,
  postLikes,
  handleDeletePost,
}) {
  const [isSentComment, setIsSentComment] = useState(false);
  const commentTextarea = useRef(null);
  console.log(commentTextarea);
  return (
    <>
      <div className={styles.postCard}>
        <Post
          date={date}
          postId={postId}
          author={author}
          authorId={authorId}
          content={content}
          avatarURL={avatarURL}
          postLikes={postLikes}
          handleDeletePost={handleDeletePost}
          inputRef={commentTextarea}
        />
        <AddComment
          setIsSentComment={setIsSentComment}
          postId={postId}
          textareaRef={commentTextarea}
        />
        <Comment postId={postId} isSentComment={isSentComment} />
      </div>
    </>
  );
}
export default PostCard;
