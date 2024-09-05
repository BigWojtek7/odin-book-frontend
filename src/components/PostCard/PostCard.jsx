import styles from './PostCard.module.css';
import Post from './Post/Post';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';
import { useEffect, useRef, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import { useOutletContext, useParams } from 'react-router-dom';

function PostCard({
  postId,
  authorId,
  content,
  avatarURL,
  forceRenderPosts,
  profileUser,
}) {
  const [forceRenderComments, setForceRenderComments] = useState(0);
  const [deletePostRes, setDeletePostRes] = useState({});

  const commentTextarea = useRef(null);
  const [addCommentFetch, setAddCommentFetch] = useState(null);

  const [token, , user, isLoading, setIsLoading] = useOutletContext();

  const [profilePosts, setProfilePosts] = useState([]);

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
      {profilePosts.map((post) => (
        <div className={styles.postCard} key={post.post_id}>
          <Post
            date={post.post_date}
            postId={post.post_id}
            author={post.author_name}
            authorId={authorId}
            content={post.post_content}
            avatarURL={post.avatar_url}
            handleDeletePost={handleDeletePost}
            inputRef={commentTextarea}
          />
          <AddComment
            setForceRenderComments={setForceRenderComments}
            postId={post.post_id}
            textareaRef={commentTextarea}
            addCommentFetch={addCommentFetch}
            setAddCommentFetch={setAddCommentFetch}
          />
          <Comment postId={postId} forceRenderComments={forceRenderComments} />
        </div>
      ))}
    </>
  );
}
export default PostCard;
