import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment'
// import { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import getRequestWithNativeFetch from '../../utils/fetchApiGet';

function PostCard({ id, date, author, content, avatarURL, postLikes }) {
  return (
    <>
      <div className={styles.postCard}>
        <Post
          date={date}
          author={author}
          content={content}
          avatarURL={avatarURL}
          postLikes={postLikes}
        />
        <AddComment />
        <Comment postId={id} />
      </div>
    </>
  );
}
export default PostCard;
