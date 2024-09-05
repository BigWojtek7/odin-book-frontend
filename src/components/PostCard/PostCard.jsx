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
  handleDeletePost,
}) {
  const [forceRenderComments, setForceRenderComments] = useState(0);
  const commentTextarea = useRef(null);
  const [addCommentFetch, setAddCommentFetch] = useState(null);

  useEffect(() => {
    if (profileUser?.user_id) {
      setIsLoading(true);
      const fetchDataForPosts = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/posts/user/${
            profileUser.user_id
          }`;
          const headers = {
            Authorization: token,
          };
          const postsData = await getRequestWithNativeFetch(url, headers);

          setProfilePosts(postsData);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDataForPosts();
    }
    return () => {
      setProfilePosts([]);
    };
  }, [setIsLoading, token, profileUser, forceRenderPosts, deletePostRes]);

  const handleDeletePost = (e, postId) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForDeletePost = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeletePostRes(deleteData);

        if (deleteData.success) {
          setDeletePostRes(deleteData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataForDeletePost();
  };

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
          handleDeletePost={handleDeletePost}
          inputRef={commentTextarea}
        />
        <AddComment
          setForceRenderComments={setForceRenderComments}
          postId={postId}
          textareaRef={commentTextarea}
          addCommentFetch={addCommentFetch}
          setAddCommentFetch={setAddCommentFetch}
        />
        <Comment postId={postId} forceRenderComments={forceRenderComments} />
      </div>
    </>
  );
}
export default PostCard;
