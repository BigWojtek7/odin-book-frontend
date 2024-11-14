import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import useProfileData from '../../hooks/useProfileData';
import AddPost from '../../components/PostCard/AddPost/AddPost';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';

function Profile() {
  const [forceRenderPosts, setForceRenderPosts] = useState(0);

  const { followerid } = useParams();

  const { profileUser, isFollowerProfile } = useProfileData(followerid);

  const { token } = useAuth();

  const { posts, setPosts } = usePosts(
    `${import.meta.env.VITE_BACKEND_URL}/posts/user/${profileUser?.user_id}`,
    Boolean(profileUser?.user_id)
  );

  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== deletedPostId)
    );
  };

  const handleAddPost = async (content) => {
    e.preventDefault();
    try {
      loaderStart();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          content: e.target.content.value,
        }),
        method: 'post',
      };
      const createPostDate = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/`,
        options
      );
      setCreatePostRes(createPostDate);
      console.log(createPostDate);
      if (createPostDate.success) {
        setPosts((prevPosts) => [
          {
            author_id: createCommentData.data.user_id,
            author_name: createCommentData.data.author_name,
            avatar_url: createCommentData.data.avatar_url,

            comment_id: createCommentData.data.id,
            content: createCommentData.data.content,
            date_format: createCommentData.data.date_format,
          },
          ...prevPosts,
        ]);
        addNotification('The post has been created', 'success');
      }
    } catch (err) {
      console.log(err.name);
    } finally {
      loaderStop();
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <UserCard profileUser={profileUser} />
        <div className={styles.posts}>
          {!isFollowerProfile && (
            <AddPost
              avatarURL={profileUser?.avatar_url}
              handleAddPost={handleAddPost}
            />
          )}
          <PostCard posts={posts} onDelete={handleDeletePost} />
        </div>
      </div>
    </>
  );
}
export default Profile;
