import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import AddPost from '../../components/AddPost/AddPost';
import Loader from '../../components/Loader/Loader';
import requestWithNativeFetch from '../../utils/fetchApi';
function Profile() {
  const [profilePosts, setProfilePosts] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [deleteRes, setDeleteRes] = useState({});

  const [token, , user, isLoading, setIsLoading] = useOutletContext();

  const [followerProfile, setFollowerProfile] = useState();
  const [profileUser, setProfileUser] = useState({});

  const { followerid } = useParams();

  const isFollowerProfile = followerid !== 'profile';

  useEffect(() => {
    setProfileUser(isFollowerProfile ? followerProfile : user);
  }, [followerProfile, isFollowerProfile, user]);

  useEffect(() => {
    if (token && isFollowerProfile) {
      const fetchDataForUsers = async () => {
        try {
          const url = `${
            import.meta.env.VITE_BACKEND_URL
          }/users/${followerid}/profile`;
          const headers = {
            Authorization: token,
          };
          const userData = await getRequestWithNativeFetch(url, headers);
          setFollowerProfile(userData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForUsers();
    }
    return () => {
      setFollowerProfile([]);
    };
  }, [token, isFollowerProfile, followerid]);

  useEffect(() => {
    if (profileUser?.user_id) {
      setIsLoading(true);
      console.log('woltix');
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
  }, [setIsLoading, token, profileUser, isSent, deleteRes]);

  const handleDeletePost = (e, postId) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForDeletePost = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`;
        const headers = { Authorization: token };
        const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
        setDeleteRes(deleteData);

        if (deleteData.success) {
          setDeleteRes(deleteData);
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.profile}>
          <UserCard profileUser={profileUser} />
          <div className={styles.posts}>
            <AddPost
              avatarURL={user.avatar_url}
              isSent={isSent}
              setIsSent={setIsSent}
            />
            {profilePosts.map((post) => (
              <PostCard
                postId={post.post_id}
                date={post.post_date}
                author={post.author_name}
                authorId={isFollowerProfile ? post.author_id : '#'}
                content={post.post_content}
                avatarURL={post.avatar_url}
                postLikes={post.post_likes}
                handleDeletePost={handleDeletePost}
                key={post.post_id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default Profile;
