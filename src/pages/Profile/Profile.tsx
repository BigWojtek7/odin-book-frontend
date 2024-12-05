import { useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import useProfileData from '../../hooks/useProfileData';
import AddPost from '../../components/PostCard/AddPost/AddPost';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

function Profile() {
  const { followerid } = useParams();

  const { profileUser, isFollowerProfile } = useProfileData(followerid);

  const { token } = useAuth();

  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

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
    try {
      loaderStart();
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          content: content,
        }),
        method: 'post',
      };
      const createPostData = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/`,
        options
      );
      if (createPostData.success) {
        setPosts((prevPosts) => [
          {
            author_id: createPostData.data.user_id,
            author_name: createPostData.data.author_name,
            avatar_url: createPostData.data.avatar_url,
            post_id: createPostData.data.id,
            post_content: createPostData.data.content,
            post_date: createPostData.data.date_format,
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
        <div className={styles.userCard}>
          <UserCard profileUser={profileUser} /></div>
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
